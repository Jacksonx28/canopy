import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const app = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');
const initialRecord = JSON.stringify({
  version: 2,
  balances: { ZRO: 999, USDT0: 150, PYUSD: 125, weETH: 2 },
  activity: [
    { type: 'Swap', time: '10:00 AM', detail: 'Swap order', receipt: { endsAt: 108000, to: 'USDT0', received: 2.5 } },
    { type: 'Bridge', time: '10:01 AM', detail: 'Bridge order', receipt: { sourceAt: 105000, endsAt: 120000 } },
    { type: 'Claim', time: '10:02 AM', detail: 'Claim reward' },
  ],
});

function openActivity(session = new Map()) {
  const saved = new Map([['canopy-zero-state', initialRecord]]);
  const events = new Map();
  const nodes = new Map();
  let now = 100000;
  function element(selector) {
    if (!nodes.has(selector)) nodes.set(selector, { dataset: {}, innerHTML: '', addEventListener() {}, setAttribute() {} });
    return nodes.get(selector);
  }
  const storage = values => ({ getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) });
  runInNewContext(app, {
    crypto: webcrypto,
    document: {
      documentElement: { dataset: {} },
      querySelector: element,
      querySelectorAll: () => [],
      addEventListener(type, handler) { events.set(type, [...(events.get(type) ?? []), handler]); },
    },
    window: { addEventListener() {} },
    CanopyUI: { enter() {}, graphic: () => '', token: () => '' },
    localStorage: storage(saved),
    sessionStorage: storage(session),
    location: { hash: '#activity' },
    Date: class extends Date { static now() { return now; } },
    setTimeout: () => 1,
    clearTimeout() {},
  });
  return {
    main: () => element('#main').innerHTML,
    results: () => element('#activity-results').innerHTML,
    change(name, value) { events.get('change').forEach(handler => handler({ target: { dataset: { activityFilter: name }, value } })); },
    resume(at) { now = at; events.get('visibilitychange').forEach(handler => handler()); },
  };
}

test('Activity combines type and status without renumbering receipt links', () => {
  const page = openActivity();
  assert.match(page.main(), /Claim reward.*[\s\S]*Bridge order.*[\s\S]*Swap order/);
  page.change('status', 'pending');
  assert.doesNotMatch(page.results(), /Claim reward/);
  page.change('type', 'Bridge');
  assert.match(page.results(), /data-activity-index="1"[\s\S]*Bridge order/);
  assert.doesNotMatch(page.results(), /Swap order/);
  page.change('status', 'complete');
  assert.match(page.results(), /No matching activity/);
});

test('a resumed tab updates which rows match and a reload keeps the selected filters', () => {
  const session = new Map();
  const page = openActivity(session);
  page.change('type', 'Swap');
  page.change('status', 'pending');
  assert.match(page.results(), /Swap order/);
  page.resume(109000);
  assert.match(page.results(), /No matching activity/);
  page.change('status', 'complete');
  assert.match(page.results(), /Swap order/);
  const reloaded = openActivity(session);
  assert.match(reloaded.main(), /<option value="Swap" selected>Swaps/);
  assert.match(reloaded.main(), /<option value="complete" selected>Complete/);
});
