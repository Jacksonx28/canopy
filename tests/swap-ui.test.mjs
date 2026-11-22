import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const app = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');

function openSwap(hash = '#swap', balanceOverrides = {}, activity = [], options = {}) {
  const location = { hash };
  const nodes = new Map();
  const balances = { ZRO: 1000, USDT0: 150, PYUSD: 125, weETH: 2, ...balanceOverrides };
  const storage = options.storage ?? new Map([['canopy-zero-state', JSON.stringify({ balances, staked: 0, rewards: 0, activity })]]);
  const timers = new Map();
  let now = options.now ?? 100_000;
  let timerId = 0;
  const listeners = {};
  const chartPanel = { open: true, dataset: {}, isConnected: true };
  const embeds = [];
  const copied = [];
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
        dispatchEvent(event) { this.listeners[event.type]?.(event); },
        querySelector: element,
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
      if (selector === '[data-slippage-percent]') return [0.1, 0.5, 1].map(percent => {
        const button = element(`slippage-${percent}`);
        button.dataset.slippagePercent = String(percent);
        return button;
      });
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
    addEventListener(type, handler) { (listeners[type] ??= []).push(handler); },
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
      setItem: (key, value) => {
        options.beforeSetItem?.(key, value);
        storage.set(key, value);
      }
    },
    Date: class extends Date {
      constructor(...args) { super(...(args.length ? args : [now])); }
      static now() { return now; }
    },
    Event,
    crypto: webcrypto,
    navigator: {clipboard: {async writeText(value) { copied.push(value); }}},
    setTimeout(callback, delay) { timers.set(++timerId, { callback, due: now + delay }); return timerId; },
    clearTimeout(id) { timers.delete(id); }
  };
  runInNewContext(app, sandbox);
  const advance = milliseconds => {
    now += milliseconds;
    for (const [id, timer] of [...timers]) {
      if (timer.due > now || !timers.delete(id)) continue;
      timer.callback();
    }
  };
  const setHidden = value => {
    document.hidden = value;
    listeners.visibilitychange?.forEach(handler => handler());
  };
  return { element, storage, embeds, location, balances, advance, setHidden, copied,
    now: () => now, openStake: () => sandbox.stakeModal('ZRO'), openClaim: () => sandbox.claimDemoRewards(),
    showActivity: index => sandbox.openActivityDetails(index) };
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

test('a pending swap restores its countdown after reopening and credits the demo receipt only once', () => {
  const { element, storage, balances, now } = openSwap();
  element('#review-trade').onclick();
  assert.match(element('#modal-content').innerHTML, /Simulation only/);
  element('#confirm').onclick();
  let record = JSON.parse(storage.get('canopy-zero-state'));
  assert.equal(record.balances.ZRO, balances.ZRO - 1);
  assert.equal(record.balances.USDT0, balances.USDT0);
  assert.equal(record.activity[0].type, 'Swap');
  assert.match(element('#modal-content').innerHTML, /0:08/);
  assert.match(element('#main').innerHTML, /data-activity-index="0"/);

  const reopened = openSwap('#activity', {}, [], { storage, now: now() + 3000 });
  reopened.showActivity(0);
  assert.match(reopened.element('#modal-content').innerHTML, /0:05/);
  reopened.setHidden(true);
  reopened.advance(6000);
  assert.equal(JSON.parse(storage.get('canopy-zero-state')).balances.USDT0, balances.USDT0);
  reopened.setHidden(false);
  record = JSON.parse(storage.get('canopy-zero-state'));
  assert.ok(record.balances.USDT0 > balances.USDT0);
  assert.equal(record.activity[0].receipt.settled, true);
  const settledBalance = record.balances.USDT0;
  const settled = openSwap('#activity', {}, [], { storage, now: reopened.now() + 1000 });
  settled.showActivity(0);
  assert.match(settled.element('#modal-content').innerHTML, /data-status-label role="status">Complete/);
  assert.equal(JSON.parse(storage.get('canopy-zero-state')).balances.USDT0, settledBalance);
});

test('the submitted #testnet deep link opens demo swap and keeps its URL fragment', () => {
  const { element, location } = openSwap('#testnet');
  assert.equal(location.hash, '#testnet');
  assert.equal(element('#breadcrumb').textContent, 'Swap');
  assert.match(element('#main').innerHTML, /Demo Mode/);
  assert.match(element('#swap-pair').innerHTML, /ZRO \/ USDT0/);
});

test('Bridge is a ZRO-only tab in the Swap workspace and tracks source and destination demo stages', () => {
  for (const hash of ['#swap/bridge', '#bridge']) {
    const { element, storage, balances, advance, showActivity } = openSwap(hash);
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
    element('#confirm').onclick();
    const state = JSON.parse(storage.get('canopy-zero-state'));
    assert.equal(state.balances.ZRO, balances.ZRO);
    assert.equal(state.activity[0].type, 'Bridge');
    assert.deepEqual(state.activity[0].symbols, ['ZRO']);
    assert.match(element('#main').innerHTML, /activity-asset-icons[^>]*><img data-token="ZRO"/);
    assert.match(state.activity[0].detail, /Zero \(demo\) to Ethereum/);
    assert.match(element('#modal-content').innerHTML, /Source pending/);
    assert.match(element('#modal-content').innerHTML, /0:20/);
    advance(5000);
    showActivity(0);
    assert.match(element('#modal-content').innerHTML, /In transit/);
    assert.match(element('#modal-content').innerHTML, /0:15/);
    advance(15000);
    showActivity(0);
    assert.match(element('#modal-content').innerHTML, /data-status-label role="status">Complete/);
    assert.equal(JSON.parse(storage.get('canopy-zero-state')).balances.ZRO, balances.ZRO);
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


test('slippage presets and custom values set the reviewed minimum received', () => {
  const { element, storage } = openSwap();
  assert.equal(element('slippage-0.5').attributes['aria-pressed'], 'true');
  element('slippage-1').onclick();
  assert.equal(element('#trade-slippage').value, '1');
  assert.equal(element('slippage-1').attributes['aria-pressed'], 'true');
  const input=element('#trade-slippage');
  input.value='6';
  input.dispatchEvent(new Event('input'));
  assert.equal(element('#review-trade').disabled, true);
  input.value='2.25';
  input.dispatchEvent(new Event('input'));
  assert.equal(element('#review-trade').disabled, false);
  const minimum=element('#minimum-received').textContent;
  assert.match(minimum, /^2\.436[0-9]+ USDT0$/);
  element('#review-trade').onclick();
  assert.ok(element('#modal-content').innerHTML.includes(minimum));
  assert.match(element('#modal-content').innerHTML, /<b>2\.25%<\/b>/);
  element('#confirm').onclick();
  const {receipt}=JSON.parse(storage.get('canopy-zero-state')).activity[0];
  assert.equal(receipt.slippagePercent, 2.25);
  assert.equal(`${receipt.minimumReceived} USDT0`, minimum);
  assert.equal(receipt.recipient, null);
});

test('Swap and Bridge require a valid custom recipient and record the reviewed address', () => {
  const recipient=`0x${'a'.repeat(40)}`;
  for (const hash of ['#swap', '#swap/bridge']) {
    const { element, storage, balances, advance } = openSwap(hash);
    const picker=element('#trade-recipient-mode');
    const input=element('#trade-recipient');
    assert.equal(element('#trade-recipient-address').hidden, true);
    picker.value='external';
    picker.onchange();
    assert.equal(element('#trade-recipient-address').hidden, false);
    assert.equal(element('#review-trade').disabled, true);
    input.value=`0x${'0'.repeat(40)}`;
    input.dispatchEvent(new Event('input'));
    assert.equal(element('#review-trade').disabled, true);
    input.value=recipient+'00';
    input.dispatchEvent(new Event('input'));
    assert.equal(element('#review-trade').disabled, true);
    input.value=recipient;
    input.dispatchEvent(new Event('input'));
    assert.equal(element('#review-trade').disabled, false);
    element('#review-trade').onclick();
    assert.ok(element('#modal-content').innerHTML.includes(recipient));
    element('#confirm').onclick();
    advance(21000);
    const stored=JSON.parse(storage.get('canopy-zero-state'));
    assert.equal(stored.activity[0].receipt.recipient, recipient);
    assert.equal(stored.activity[0].receipt.settled, true);
    assert.equal(stored.balances.ZRO, balances.ZRO - (hash === '#swap' ? 1 : 0));
    assert.equal(stored.balances.USDT0, balances.USDT0);
  }
});

test('demo hashes stay stable across reloads and copy the full reference', async () => {
  const original = openSwap('#activity', {}, [{type:'Swap',detail:'1 ZRO to 2 USDT0',time:'10:00 AM'}]);
  original.showActivity(0);
  const saved = JSON.parse(original.storage.get('canopy-zero-state')).activity[0].demoHash;
  assert.match(saved, /^0x[0-9a-f]{64}$/);
  const reopened = openSwap('#activity', {}, [], {storage:original.storage});
  reopened.showActivity(0);
  assert.match(reopened.element('#modal-content').innerHTML, /Demo transaction hash/);
  assert.ok(reopened.element('#modal-content').innerHTML.includes(saved));
  await reopened.element('#copy-demo-hash').onclick();
  assert.deepEqual(reopened.copied, [saved]);
});

test('Rewards explains an existing claim and offers an explicit demo reset', () => {
  const storage = new Map([['canopy-zero-state', JSON.stringify({
    version: 2, balances: { ZRO: 1012 }, rewards: 0, staked: 240,
    activity: [{ type: 'Claim', detail: '12 ZRO rewards', time: '10:00 AM' }]
  })]]);
  const { element } = openSwap('#rewards', {}, [], { storage });
  const html = element('#main').innerHTML;
  assert.match(html, /You already claimed your demo rewards/);
  assert.match(html, /data-action="reset-demo">Reset demo…/);
  assert.match(html, /data-activity-index="0"[\s\S]*12 ZRO rewards/);
  assert.doesNotMatch(html, /data-action="claim"/);
});

test('Rewards retains an unsaved claim for retry and credits the claim only once', () => {
  let blocked = true;
  const { element, storage, openClaim, balances } = openSwap('#rewards', {}, [], {
    beforeSetItem(key) {
      if (blocked && key === 'canopy-zero-state') throw new Error('Simulated storage failure');
    }
  });
  openClaim();
  const confirm = element('#confirm-claim');
  confirm.onclick();
  assert.equal(element('#modal').open, true);
  assert.equal(confirm.disabled, false);
  assert.match(element('#claim-reward-error').textContent, /unchanged/);
  assert.equal(JSON.parse(storage.get('canopy-zero-state')).balances.ZRO, balances.ZRO);
  blocked = false;
  confirm.onclick();
  confirm.onclick();
  const saved = JSON.parse(storage.get('canopy-zero-state'));
  assert.equal(saved.rewards, 0);
  assert.equal(saved.balances.ZRO, balances.ZRO + 12);
  assert.equal(saved.activity.length, 1);
  assert.equal(saved.activity[0].type, 'Claim');
  assert.equal(element('#modal').open, false);
});
