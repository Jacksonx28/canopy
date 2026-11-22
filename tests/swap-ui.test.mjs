import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const app = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');

function openSwap(hash = '#swap') {
  const location = { hash };
  const nodes = new Map();
  const storage = new Map();
  const chartPanel = { open: true, dataset: {}, isConnected: true };
  const embeds = [];

  function element(selector) {
    if (!nodes.has(selector)) {
      nodes.set(selector, {
        dataset: {},
        listeners: {},
        setAttribute() {},
        addEventListener(type, callback) { this.listeners[type] = callback; },
        classList: { add() {}, remove() {} },
        before() {},
        showModal() { this.open = true; },
        close() { this.open = false; },
        contains() { return true; }
      });
    }
    return nodes.get(selector);
  }
  Object.assign(element('#swap-chart-panel'), chartPanel);
  element('#from-asset').value = 'ETH';
  element('#to-asset').value = 'USDC';
  const document = {
    documentElement: { dataset: {}, classList: {} },
    querySelector: element,
    querySelectorAll(selector) {
      const chart = element('#swap-chart-content');
      const markup = chart.innerHTML ?? '';
      const market = markup.match(/data-tv="([^"]+)"/);
      if (!market || selector !== '[data-tv]:not([data-loaded])' || markup === embeds.at(-1)?.markup) return [];
      return [{
        dataset: { tv: market[1], chartTitle: markup.match(/data-chart-title="([^"]+)"/)[1] },
        closest: () => !element('#swap-chart-panel').open,
        append(frame) { embeds.push({ frame, markup }); }
      }];
    },
    addEventListener() {},
    createElement: () => element('created')
  };
  const window = { addEventListener() {} };
  const CanopyUI = {
    token: symbol => `<img data-token="${symbol}" alt="">`,
    graphic: () => '',
    enter() {},
    progress: () => '',
    transaction() {}
  };
  runInNewContext(app, {
    window,
    document,
    CanopyUI,
    location,
    localStorage: {
      getItem: key => storage.get(key),
      setItem: (key, value) => storage.set(key, value)
    },
    setTimeout: callback => callback()
  });
  return { element, storage, embeds, location };
}

function activeMarket(embeds) {
  return JSON.parse(decodeURIComponent(embeds.at(-1).frame.src.split('#')[1])).symbol;
}

test('swap chart follows token changes and reversed pairs without falling back to an unrelated market', () => {
  const { element, embeds } = openSwap();
  assert.equal(activeMarket(embeds), 'BINANCE:ETHUSDC');
  assert.match(element('#swap-pair').innerHTML, /ETH \/ USDC/);
  element('#from-asset').value = 'SOL';
  element('#from-asset').onchange();
  assert.equal(activeMarket(embeds), 'BINANCE:SOLUSDC');
  assert.match(element('#pay-token-logo').innerHTML, /data-token="SOL"/);
  element('#reverse').onclick();
  assert.match(element('#swap-pair').innerHTML, /USDC \/ SOL/);
  assert.match(element('#receive-token-logo').innerHTML, /data-token="SOL"/);
  assert.match(element('#swap-chart-content').innerHTML, /Chart unavailable/);
  assert.doesNotMatch(element('#swap-chart-content').innerHTML, /data-tv=/);
});

test('collapsed chart waits to load, then displays the current pair on expansion', () => {
  const { element, embeds } = openSwap();
  const panel = element('#swap-chart-panel');
  panel.open = false;
  panel.listeners.toggle();
  element('#to-asset').value = 'BTC';
  element('#to-asset').onchange();
  assert.match(element('#swap-pair').innerHTML, /ETH \/ BTC/);
  assert.equal(embeds.length, 1);
  panel.open = true;
  panel.listeners.toggle();
  assert.equal(activeMarket(embeds), 'BINANCE:ETHBTC');
});

test('a confirmed swap records a simulation and updates the local demo balances', async () => {
  const { element, storage } = openSwap();
  element('#review-trade').onclick();
  assert.match(element('#modal-content').innerHTML, /Simulation only/);
  await element('#confirm').onclick();
  const state = JSON.parse(storage.get('canopy-zero-state'));
  assert.equal(state.balances.ETH, 5.24 - 1);
  assert.ok(state.balances.USDC > 10850.01);
  assert.equal(state.activity[0].type, 'Swap');
});

test('the submitted #testnet deep link opens demo swap and keeps its URL fragment', () => {
  const { element, embeds, location } = openSwap('#testnet');
  assert.equal(location.hash, '#testnet');
  assert.equal(element('#breadcrumb').textContent, 'Swap');
  assert.match(element('#main').innerHTML, /Demo Mode/);
  assert.equal(activeMarket(embeds), 'BINANCE:ETHUSDC');
});
