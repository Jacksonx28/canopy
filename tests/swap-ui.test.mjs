import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const app = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');

function openSwap(hash = '#swap', balanceOverrides = {}, activity = []) {
  const location = { hash };
  const nodes = new Map();
  const balances = { ZRO: 1000, USDT0: 150, PYUSD: 125, weETH: 2, ...balanceOverrides };
  const storage = new Map([['canopy-zero-state', JSON.stringify({ balances, staked: 0, rewards: 0, activity })]]);
  const chartPanel = { open: true, dataset: {}, isConnected: true };
  const embeds = [];
  const navigatingBridge = hash === '#bridge' || hash === '#swap/bridge';

  function element(selector) {
    if (!nodes.has(selector)) {
      nodes.set(selector, {
        dataset: {},
        listeners: {},
        attributes: {},
        setAttribute(name, value) { this.attributes[name] = value; },
        addEventListener(type, callback) {
          const previous = this.listeners[type];
          this.listeners[type] = previous ? (...args) => { previous(...args); callback(...args); } : callback;
        },
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
  for (const group of ['trade', 'stake']) {
    const buttons = [25, 50, 75, 100].map(percent => {
      const button = element(`${group}-percent-${percent}`);
      button.dataset.amountPercent = String(percent);
      return button;
    });
    element(`#${group}-amount-shortcuts`).querySelectorAll = () => buttons;
  }
  element('#from-asset').value = 'ZRO';
  element('#to-asset').value = navigatingBridge ? 'ZRO' : 'USDT0';
  element('#from-network').value = 'Ethereum';
  element('#to-network').value = 'Zero (demo)';
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
    network: name => `<img data-network="${name}" alt="">`,
    graphic: () => '',
    enter() {},
    progress: () => '',
    transaction() {}
  };
  const sandbox = {
    window,
    document,
    CanopyUI,
    location,
    localStorage: {
      getItem: key => storage.get(key),
      setItem: (key, value) => storage.set(key, value)
    },
    setTimeout: callback => callback()
  };
  runInNewContext(app, sandbox);
  return { element, storage, embeds, location, balances, openStake: () => sandbox.stakeModal('ZRO') };
}

test('swap offers Zero ecosystem examples and updates the selected pair and logos', () => {
  const { element, embeds } = openSwap();
  assert.match(element('#main').innerHTML, /<option selected>ZRO<\/option>/);
  assert.match(element('#main').innerHTML, /<option selected>USDT0<\/option>/);
  assert.doesNotMatch(element('#main').innerHTML, /<option[^>]*>(BTC|SOL)<\/option>/);
  assert.match(element('#swap-pair').innerHTML, /ZRO \/ USDT0/);
  assert.match(element('#swap-chart-content').innerHTML, /external ZRO \/ USD reference/);
  element('#from-asset').value = 'weETH';
  element('#from-asset').onchange();
  assert.match(element('#swap-pair').innerHTML, /weETH \/ USDT0/);
  assert.match(element('#pay-token-logo').innerHTML, /data-token="weETH"/);
  element('#reverse').onclick();
  assert.match(element('#swap-pair').innerHTML, /USDT0 \/ weETH/);
  assert.match(element('#receive-token-logo').innerHTML, /data-token="weETH"/);
  assert.match(element('#swap-chart-content').innerHTML, /Chart unavailable/);
  assert.doesNotMatch(element('#swap-chart-content').innerHTML, /data-tv=/);
  assert.equal(embeds.length, 0);
});

test('a pair selected while the chart is collapsed has its own labeled chart state', () => {
  const { element, embeds } = openSwap();
  const panel = element('#swap-chart-panel');
  panel.open = false;
  panel.listeners.toggle();
  element('#to-asset').value = 'PYUSD';
  element('#to-asset').onchange();
  assert.match(element('#swap-pair').innerHTML, /ZRO \/ PYUSD/);
  panel.open = true;
  panel.listeners.toggle();
  assert.match(element('#swap-chart-content').innerHTML, /No exchange chart is available for ZRO \/ PYUSD/);
  assert.equal(embeds.length, 0);
});

test('a confirmed swap records a simulation and updates the local demo balances', async () => {
  const { element, storage, balances } = openSwap();
  element('#review-trade').onclick();
  assert.match(element('#modal-content').innerHTML, /Simulation only/);
  await element('#confirm').onclick();
  const state = JSON.parse(storage.get('canopy-zero-state'));
  assert.equal(state.balances.ZRO, balances.ZRO - 1);
  assert.ok(state.balances.USDT0 > balances.USDT0);
  assert.equal(state.activity[0].type, 'Swap');
});

test('the submitted #testnet deep link opens demo swap and keeps its URL fragment', () => {
  const { element, location } = openSwap('#testnet');
  assert.equal(location.hash, '#testnet');
  assert.equal(element('#breadcrumb').textContent, 'Swap');
  assert.match(element('#main').innerHTML, /Demo Mode/);
  assert.match(element('#swap-pair').innerHTML, /ZRO \/ USDT0/);
});

test('Bridge is a ZRO-only tab in the Swap workspace, including on the old Bridge link', async () => {
  for (const hash of ['#swap/bridge', '#bridge']) {
    const { element, storage, balances } = openSwap(hash);
    assert.equal(element('#breadcrumb').textContent, 'Swap');
    assert.doesNotMatch(element('#nav').innerHTML, />Bridge</);
    assert.match(element('#main').innerHTML, /href="#swap\/bridge" class="active" aria-current="page">Bridge/);
    assert.doesNotMatch(element('#main').innerHTML, /<option[^>]*>(BTC|SOL|USDT0|PYUSD|weETH)<\/option>/);
    assert.equal(element('#review-trade').textContent, 'Review demo bridge');
    assert.equal(element('#route-from').textContent, 'Ethereum');
    assert.equal(element('#route-to').textContent, 'Zero (demo)');
    element('#reverse').onclick();
    assert.equal(element('#route-to').textContent, 'Ethereum');
    element('#review-trade').onclick();
    assert.match(element('#modal-content').innerHTML, /Simulation only/);
    await element('#confirm').onclick();
    const state = JSON.parse(storage.get('canopy-zero-state'));
    assert.equal(state.balances.ZRO, balances.ZRO);
    assert.equal(state.activity[0].type, 'Bridge');
    assert.deepEqual(state.activity[0].symbols, ['ZRO']);
    assert.match(element('#main').innerHTML, /activity-asset-icons[^>]*><img data-token="ZRO"/);
    assert.match(state.activity[0].detail, /Zero \(demo\) to Ethereum/);
  }
});

test('the Zero portfolio omits cash controls and discovery cards, while Markets contains the radar', () => {
  const portfolio = openSwap('#portfolio').element('#main').innerHTML;
  assert.match(portfolio, /Zero · Demo/);
  assert.match(portfolio, /1,000 ZRO/);
  assert.doesNotMatch(portfolio, /On your radar|Market charts|Add funds|Buying power|>Cash</);
  const markets = openSwap('#markets').element('#main').innerHTML;
  assert.match(markets, /On your radar/);
  assert.match(markets, /data-mini="stocks"/);
  assert.match(markets, /data-mini="memes"/);
});

test('Swap and Bridge shortcuts fill the pay amount and recalculate the quote', () => {
  for (const hash of ['#swap', '#swap/bridge']) {
    const { element } = openSwap(hash);
    assert.match(element('#main').innerHTML, /25%.*50%.*75%.*Max/);
    for (const percent of [25, 50, 75, 100]) {
      const shortcut = element(`trade-percent-${percent}`);
      shortcut.onclick();
      assert.equal(Number(element('#amount').value), 10 * percent);
      assert.equal(shortcut.attributes['aria-pressed'], 'true');
      assert.ok(Number(element('#receive').value) > 0);
      assert.equal(element('#review-trade').disabled, false);
    }
  }

  const { element } = openSwap('#swap', { weETH: 0.2, PYUSD: 0 });
  element('#from-asset').value = 'weETH';
  element('#from-asset').onchange();
  element('trade-percent-75').onclick();
  assert.equal(element('#amount').value, '0.15');
  element('#from-asset').value = 'PYUSD';
  element('#from-asset').onchange();
  assert.equal(element('trade-percent-100').disabled, true);
  assert.equal(element('trade-percent-75').attributes['aria-pressed'], 'false');
});

test('a Stake shortcut uses available ZRO and can be confirmed', () => {
  const { element, openStake, storage } = openSwap('#stake');
  openStake();
  assert.match(element('#modal-content').innerHTML, /25%.*50%.*75%.*Max/);
  element('stake-percent-75').onclick();
  assert.equal(element('#stake-amount').value, '750');
  element('#confirm-stake').onclick();
  const state = JSON.parse(storage.get('canopy-zero-state'));
  assert.equal(state.balances.ZRO, 250);
  assert.equal(state.staked, 990);
});


test('previous swaps and transfers show token marks without stored symbol metadata', () => {
  const activity = [
    { type: 'Swap', detail: '1,200 ZRO to 2,991 USDT0', time: '10:00 AM' },
    { type: 'Bridge', detail: '500 ZRO · Ethereum to Zero (demo)', time: '10:01 AM' },
  ];
  const html = openSwap('#activity', {}, activity).element('#main').innerHTML;
  assert.match(html, /activity-asset-icons activity-asset-pair[^>]*><img data-token="ZRO" alt=""><img data-token="USDT0"/);
  assert.match(html, /activity-asset-icons [^>]*><img data-token="ZRO"[^>]*><\/span>/);
});
