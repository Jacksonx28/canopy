import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const script = readFileSync(new URL('../dist/market-data.js', import.meta.url), 'utf8');
const base = Date.UTC(2026, 10, 23, 12);

function quote(time = base, overrides = {}) {
  return {
    id: 'bitcoin', current_price: 85_000, market_cap: 1_700_000_000_000,
    total_volume: 2_500_000, price_change_percentage_24h: -1.25,
    sparkline_in_7d: { price: [86_000, 85_500, 85_000] },
    last_updated: new Date(time).toISOString(), ...overrides
  };
}

function boot({ storage = new Map(), clock = { now: base }, fetch }) {
  const window = {};
  runInNewContext(script, {
    window, URLSearchParams, AbortController, setTimeout, clearTimeout, fetch,
    Date: class extends Date { static now() { return clock.now; } },
    sessionStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value)
    }
  });
  return { api: window.CanopyMarketData, clock, storage };
}

const success = rows => ({ ok: true, json: async () => rows });

test('market quotes use one lazy batched call and a reusable five-minute session cache', async () => {
  let resolve;
  const calls = [];
  const fetch = (url, options) => {
    calls.push({ url: new URL(url), options });
    return new Promise(done => { resolve = done; });
  };
  const { api, storage, clock } = boot({ fetch });
  assert.equal(api.state(), 'idle');
  assert.equal(calls.length, 0);
  const request = api.load();
  assert.equal(api.state(), 'loading');
  assert.equal(api.load(), request);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url.origin, 'https://api.coingecko.com');
  assert.equal(calls[0].url.searchParams.get('sparkline'), 'true');
  assert.equal(new Set(calls[0].url.searchParams.get('ids').split(',')).size, 25);
  assert.equal(calls[0].options.credentials, 'omit');
  resolve(success([quote()]));
  await request;
  assert.equal(api.state(), 'ready');
  assert.equal(api.get('BTC').cap, 1_700_000_000_000);
  assert.equal(api.get('BTC').volume, 2_500_000);
  assert.deepEqual(Array.from(api.get('BTC').history), [86_000, 85_500, 85_000]);
  assert.equal(api.get('SPX'), null);
  const forbiddenFetch = () => { throw new Error('a fresh cache must skip fetch'); };
  const reloaded = boot({ storage, clock, fetch: forbiddenFetch }).api;
  await reloaded.load();
  assert.equal(reloaded.state(), 'ready');
  assert.equal(reloaded.get('BTC').updatedAt, base);
  clock.now += 5 * 60_000;
  assert.equal(reloaded.state(), 'idle');
  assert.equal(reloaded.get('BTC'), null);
});

test('provider backoff suppresses repeat fetches and stale or invalid metrics are omitted', async () => {
  const clock = { now: base };
  let calls = 0;
  const fetch = async () => {
    calls++;
    if (calls === 1) return { ok: false, headers: { get: () => '120' } };
    return success([
      quote(clock.now - 61 * 60_000, { id: 'ethereum' }),
      quote(clock.now, { market_cap: -100, total_volume: '1', sparkline_in_7d: { price: [85_000, null] } }),
      quote(clock.now, { id: 'unknown' })
    ]);
  };
  const { api } = boot({ clock, fetch });
  await api.load();
  assert.equal(api.state(), 'error');
  assert.equal(api.get('BTC'), null);
  await api.load();
  clock.now += 119_999;
  await api.load();
  assert.equal(calls, 1);
  clock.now++;
  await api.load();
  assert.equal(calls, 2);
  assert.equal(api.state(), 'ready');
  assert.equal(api.get('ETH'), null);
  assert.equal(api.get('BTC').cap, null);
  assert.equal(api.get('BTC').volume, null);
  assert.equal(api.get('BTC').history.length, 0);
});
