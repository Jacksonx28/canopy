import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../src/welcome.js', import.meta.url), 'utf8').replace(/^import .*;\n/gm, '');

function mountWelcome() {
  const elements = new Map();
  const documentEvents = new Map();
  const pageEvents = new Map();
  const timers = new Map();
  let nextTimer = 0;
  let openSettingsCount = 0;
  let updateWallet;
  let activeWallet = null;
  const classList = (...names) => {
    const values = new Set(names);
    return { add: name => values.add(name), remove: name => values.delete(name), contains: name => values.has(name) };
  };
  const element = selector => {
    if (!elements.has(selector)) {
      elements.set(selector, { classList: classList(), setAttribute() {}, focus() {} });
    }
    return elements.get(selector);
  };
  const document = {
    hidden: false,
    documentElement: { dataset: {}, classList: classList('welcome-open') },
    querySelector: element,
    addEventListener(type, handler) { documentEvents.set(type, handler); },
  };
  const window = {
    addEventListener(type, handler) { pageEvents.set(type, handler); },
    dispatchEvent() {},
    showModal() { openSettingsCount += 1; },
    CanopyUI: { graphic: () => '' },
  };
  element('.sidebar').inert = true;
  element('.shell').inert = true;
  runInNewContext(source, {
    document,
    window,
    Event,
    CustomEvent: class {},
    AbortSignal,
    matchMedia: () => ({ matches: false }),
    fetch: () => new Promise(() => {}),
    sessionStorage: { getItem() {}, setItem() {}, removeItem() {} },
    setTimeout(handler) { timers.set(++nextTimer, handler); return nextTimer; },
    clearTimeout(id) { timers.delete(id); },
    createWalletConnection(onUpdate) {
      updateWallet = context => {
        const previous = activeWallet;
        activeWallet = context;
        onUpdate(context, previous);
      };
      return { current: () => activeWallet, disconnect() {} };
    },
  });
  return { element, document, documentEvents, pageEvents, timers, window, updateWallet, settingsOpened: () => openSettingsCount };
}

test('resuming the tab completes entry even with the loading animation timer suspended', () => {
  const { element, document, documentEvents, pageEvents, timers, window } = mountWelcome();
  element('#welcome-guest').onclick();
  assert.equal(element('#welcome').inert, true);
  assert.equal(element('.shell').inert, true);
  assert.equal(timers.size, 1);

  document.hidden = true;
  documentEvents.get('visibilitychange')();
  assert.equal(element('.shell').inert, true);
  document.hidden = false;
  pageEvents.get('pageshow')();

  assert.equal(timers.size, 0);
  assert.equal(element('#welcome').hidden, true);
  assert.equal(element('#entry-loader').hidden, true);
  assert.equal(element('.shell').inert, false);
  assert.equal(element('.sidebar').inert, false);
  assert.equal(document.documentElement.classList.contains('welcome-open'), false);
  assert.equal(window.CanopyMode, 'guest');
});

test('wallet updates leave closed settings closed when a tab regains focus', () => {
  const { element, updateWallet, settingsOpened } = mountWelcome();
  element('#modal').open = false;
  const wallet = { name: 'Rabby', provider: { isRabby: true } };
  const address = `0x${'a'.repeat(40)}`;
  updateWallet({ wallet, address, chainId: 1 });
  updateWallet({ wallet, address, chainId: 43002 });

  assert.equal(settingsOpened(), 0);
  assert.equal(element('#wallet').textContent, '0xaaaa…aaaa');
});
