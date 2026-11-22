import { createClient } from '@supabase/supabase-js';
import { cleanWalletInfo, safeWalletIcon } from './wallet-safety.js';
import { createWalletConnection, parseAuthConfig, parseZeroNetwork, walletError } from './zero-wallet.js';

const $ = selector => document.querySelector(selector);
const welcome = $('#welcome');
const loader = $('#entry-loader');
const app = [$('.sidebar'), $('.shell')];
const accountButton = $('#account-access');
const walletButton = $('#wallet');
const splashWalletButton = $('#auth-wallet');
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const shortAddress = address => `${address.slice(0, 6)}…${address.slice(-4)}`;
const guestKey = 'canopy-zero-guest';
const wallets = [];
const walletBrands = {
  rabby: { name: 'Rabby', icon: 'assets/rabby-wallet.png', website: 'https://rabby.io/' },
  // MetaMask fox from the official logo pack at https://metamask.io/assets.
  metamask: { name: 'MetaMask', icon: 'assets/metamask-wallet.svg', website: 'https://metamask.io/download/' },
};
let pendingEntryMode = null;
let entryTimer;
let loaderTimer;
let connecting = false;
let authBusy = false;
let authClient = null;
let authUser = null;
let authContext = null;
let zeroNetwork = null;
let authConfigLoading = true;

const connection = createWalletConnection((context, previous) => {
  if (previous && authUser) {
    authUser = null;
    authContext = null;
    void signOut('Wallet changed. Sign in again if needed.');
  }
  updateHeader(context);
  if (welcome.hidden && Boolean(context) !== Boolean(previous)) updateMode(context ? 'wallet' : 'guest');
  if ($('#modal').open && $('#zero-wallet-settings')) showSettings();
});

function updateMode(mode) {
  window.CanopyMode = mode;
  document.documentElement.dataset.workspace = mode;
  try {
    if (mode === 'guest') sessionStorage.setItem(guestKey, '1');
    else sessionStorage.removeItem(guestKey);
  } catch {}
  window.dispatchEvent(new CustomEvent('canopy:mode', { detail: mode }));
}

function updateHeader(context = connection.current()) {
  walletButton.textContent = context ? shortAddress(context.address) : 'Connect Wallet';
  walletButton.setAttribute('aria-label', context ? `Wallet settings for ${shortAddress(context.address)}` : 'Connect Wallet');
  accountButton.setAttribute('aria-label', authUser ? 'Signed-in account settings' : 'Wallet and account settings');
}

function loaderShow() {
  clearTimeout(loaderTimer);
  loader.hidden = false;
  loader.classList.remove('exiting');
  $('#entry-loading-label').textContent = 'Opening Canopy Zero…';
}

function loaderHide(immediate = false) {
  clearTimeout(loaderTimer);
  loader.classList.add('exiting');
  if (immediate || reducedMotion()) loader.hidden = true;
  else loaderTimer = setTimeout(() => { loader.hidden = true; }, 400);
}

function finishEntry(immediate = false) {
  if (!pendingEntryMode) return;
  const mode = pendingEntryMode;
  pendingEntryMode = null;
  clearTimeout(entryTimer);
  welcome.hidden = true;
  welcome.inert = false;
  app.forEach(el => el.inert = false);
  document.documentElement.classList.remove('welcome-open');
  loaderHide(immediate);
  updateMode(mode === 'wallet' && connection.current() ? 'wallet' : 'guest');
  const main = $('#main');
  main.setAttribute('tabindex', '-1');
  if (!$('#modal').open) main.focus({ preventScroll: true });
}

function enter(mode, animate = true) {
  if (pendingEntryMode) return;
  if (welcome.hidden) {
    updateMode(mode);
    return;
  }
  pendingEntryMode = mode;
  if (!animate || reducedMotion() || document.hidden) {
    finishEntry(true);
    return;
  }
  welcome.inert = true;
  loaderShow();
  entryTimer = setTimeout(finishEntry, 350);
}

function restoreEntry() {
  if (document.hidden) return;
  if (pendingEntryMode) finishEntry(true);
  else if (loader.classList.contains('exiting')) loaderHide(true);
}

// Background tabs can suspend transition timers, including on mobile Safari.
document.addEventListener('visibilitychange', restoreEntry);
window.addEventListener('pageshow', restoreEntry);

function discover(provider, info) {
  if (!provider || typeof provider.request !== 'function') return;
  const metadata = cleanWalletInfo(info ?? {});
  const known = wallets.find(wallet => wallet.provider === provider);
  if (known) {
    if (metadata.rdns) Object.assign(known, metadata);
  } else if (wallets.length < 20) {
    wallets.push({ provider, ...metadata });
  }
  if ($('#zero-wallet-choices') && !connecting) renderWallets();
}

function walletBrand(wallet) {
  const rdns = wallet.rdns?.toLowerCase();
  if (rdns === 'io.rabby' || (!rdns && wallet.provider.isRabby)) return walletBrands.rabby;
  if (rdns === 'io.metamask' || (!rdns && wallet.provider.isMetaMask)) return walletBrands.metamask;
  return null;
}

function walletIcon(icon) {
  const glyph = window.CanopyUI.graphic('<rect x="3" y="5" width="18" height="15" rx="3"/><path d="M3 9h18m-5 5h3"/>');
  return `<span class="wallet-provider-icon">${icon ? `<img src="${escape(icon)}" alt="" width="32" height="32">` : glyph}</span>`;
}

function providerIcon(wallet) {
  return walletIcon(walletBrand(wallet)?.icon || safeWalletIcon(wallet.icon));
}

function modalStatus(message, error = false) {
  const element = $('#zero-wallet-status');
  if (!element) return;
  element.textContent = message;
  element.dataset.error = String(error);
}

function renderWallets() {
  const choiceList = $('#zero-wallet-choices');
  choiceList.innerHTML = wallets.length ? wallets.map((wallet, index) => `
    <button class="wallet-choice" type="button" data-wallet-index="${index}">
      ${providerIcon(wallet)}<span><b>${escape(wallet.name)}</b><small>${escape(wallet.rdns || 'Installed EVM wallet')}</small></span>
      <span class="wallet-choice-status">Connect</span>
    </button>`).join('') : `
    <p>No wallet was detected in this browser. Try opening Canopy Zero in your wallet’s built-in browser or use a wallet extension on desktop.</p>
    ${Object.values(walletBrands).map(({ name, icon, website }) => `
      <a class="wallet-choice wallet-download" href="${website}" target="_blank" rel="noopener noreferrer">
        ${walletIcon(icon)}<span><b>Get ${name}</b></span>
      </a>`).join('')}`;
  for (const button of choiceList.querySelectorAll('[data-wallet-index]')) {
    button.disabled = connecting;
    button.onclick = () => connect(wallets[Number(button.dataset.walletIndex)]);
  }
}

function showChooser() {
  window.showModal(`
    <h2>Connect Wallet</h2>
    <p>Choose an installed wallet to share your public address. Connecting leaves Canopy Zero in Demo Mode.</p>
    <div id="zero-wallet-choices" class="wallet-options"></div>
    <p id="zero-wallet-status" class="auth-status" role="status"></p>`);
  renderWallets();
  window.dispatchEvent(new Event('eip6963:requestProvider'));
}

async function connect(wallet) {
  if (connecting) return;
  connecting = true;
  renderWallets();
  modalStatus(`Waiting for ${wallet.name}…`);
  try {
    await connection.connect(wallet);
    if ($('#zero-wallet-choices')) $('#modal').close();
    enter('wallet');
  } catch (error) {
    modalStatus(walletError(error), true);
  } finally {
    connecting = false;
    if ($('#zero-wallet-choices')) renderWallets();
  }
}

function showSettings() {
  const context = connection.current();
  if (!context) {
    if ($('#zero-wallet-settings') && $('#modal').open) showChooser();
    return;
  }
  const isZero = !!zeroNetwork && zeroNetwork.chainId === context.chainId;
  const networkName = isZero ? zeroNetwork.name : context.chainId ? `Chain ID ${context.chainId}` : 'Network unavailable';
  const activeAccount = authUser && authContext === context;
  window.showModal(`
    <div id="zero-wallet-settings">
      <h2>Wallet &amp; account</h2>
      <p class="zero-wallet-label">${providerIcon(context.wallet)} <b>${escape(context.wallet.name)} connected</b></p>
      <p class="address">${escape(context.address)}</p>
      <p>${escape(networkName)} · Demo Mode</p>
      <div class="trade-details">
        <div><span>Account</span><b>${activeAccount ? 'Signed in' : 'Signed out'}</b></div>
      </div>
      <p>${activeAccount ? 'Your wallet signature was verified by the account service.' : 'Wallet connection shares your address. Account sign-in separately verifies a wallet signature.'}</p>
      ${isZero && zeroNetwork.explorerUrl ? `<p><a href="${escape(zeroNetwork.explorerUrl)}" target="_blank" rel="noopener noreferrer">Open Zero explorer</a></p>` : ''}
      ${authClient ? `<button class="primary full" id="zero-wallet-auth" ${authBusy ? 'disabled' : ''}>${activeAccount ? 'Sign out of account' : 'Sign in with wallet'}</button>` : `<p class="form-note">${authConfigLoading ? 'Checking account service…' : 'Account sign-in is unavailable in this preview.'}</p>`}
      <p id="zero-wallet-status" class="auth-status" role="status"></p>
      <div class="modal-actions">
        <button class="secondary" id="zero-switch-wallet" ${authBusy ? 'disabled' : ''}>Change wallet</button>
        <button class="quiet" id="zero-disconnect-wallet">Disconnect</button>
      </div>
    </div>`);
  $('#zero-switch-wallet').onclick = showChooser;
  $('#zero-disconnect-wallet').onclick = () => {
    $('#modal').close();
    connection.disconnect();
    walletButton.focus();
  };
  const authButton = $('#zero-wallet-auth');
  if (authButton) authButton.onclick = activeAccount ? () => signOut() : signIn;
}

function refreshSettings(message = '', error = false) {
  updateHeader();
  if ($('#modal').open && $('#zero-wallet-settings')) {
    showSettings();
    modalStatus(message, error);
  }
}

async function signIn() {
  if (!authClient || authBusy) return;
  const context = connection.current();
  authBusy = true;
  refreshSettings('Approve the Canopy Zero sign-in message in your wallet.');
  let status = 'Signed in to Canopy Zero.';
  let failed = false;
  let issuedSession = false;
  try {
    const now = Date.now();
    const { data, error } = await authClient.auth.signInWithWeb3({
      chain: 'ethereum',
      wallet: connection.signInAdapter(context),
      statement: 'Sign in to Canopy Zero. This message does not authorize transactions or token approvals.',
      options: {
        url: new URL('./', location.href).href,
        signInWithEthereum: {
          nonce: crypto.randomUUID().replaceAll('-', ''),
          issuedAt: new Date(now),
          notBefore: new Date(now - 60 * 1000),
          expirationTime: new Date(now + 5 * 60 * 1000),
        },
      },
    });
    if (error || !data.session) throw error || Error('The account service did not issue a session.');
    issuedSession = true;
    const verified = await authClient.auth.getUser(data.session.access_token);
    const user = verified.data.user;
    const hasWalletIdentity = user?.identities?.some(identity =>
      identity.provider === 'web3' && typeof identity.identity_data?.address === 'string' &&
      identity.identity_data.address.toLowerCase() === context.address.toLowerCase(),
    );
    if (verified.error || !hasWalletIdentity) throw Error('The account service could not verify this wallet account.');
    await connection.check(context);
    authContext = context;
    authUser = user;
  } catch (error) {
    authContext = null;
    authUser = null;
    if (issuedSession) await authClient.auth.signOut({ scope: 'local' });
    status = walletError(error);
    failed = true;
  } finally {
    authBusy = false;
    refreshSettings(status, failed);
  }
}

async function signOut(message = 'Signed out of your account.') {
  if (!authClient || authBusy) return;
  authBusy = true;
  authUser = null;
  authContext = null;
  let failed = false;
  try {
    const { error } = await authClient.auth.signOut({ scope: 'local' });
    if (error) throw error;
  } catch {
    message = 'The account service could not complete sign-out. Reload before signing in again.';
    failed = true;
  } finally {
    authBusy = false;
    refreshSettings(message, failed);
  }
}

async function readConfig(path) {
  const response = await fetch(path, { cache: 'no-store', signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw Error('Could not load configuration.');
  return response.json();
}

async function configureAuth() {
  try {
    const config = parseAuthConfig(await readConfig('auth-config.json'));
    if (!config) return;
    authClient = createClient(config.url, config.key, {
      auth: { storageKey: 'canopy-zero-auth', detectSessionInUrl: false, persistSession: false },
    });
    authClient.auth.onAuthStateChange(event => {
      if (event !== 'SIGNED_OUT') return;
      authUser = null;
      authContext = null;
      refreshSettings();
    });
  } catch {
    authClient = null;
  } finally {
    authConfigLoading = false;
    refreshSettings();
  }
}

async function configureNetwork() {
  try {
    const config = await readConfig('zero-config.json');
    zeroNetwork = parseZeroNetwork(config.network);
    refreshSettings();
  } catch {
    zeroNetwork = null;
  }
}

function openWallet() {
  if (connection.current()) showSettings();
  else showChooser();
}

window.addEventListener('eip6963:announceProvider', event => discover(event.detail?.provider, event.detail?.info));
window.dispatchEvent(new Event('eip6963:requestProvider'));
const legacyProviders = window.ethereum?.providers;
for (const provider of Array.isArray(legacyProviders) ? legacyProviders : [window.ethereum]) {
  discover(provider, { name: provider?.isRabby ? 'Rabby' : provider?.isMetaMask ? 'MetaMask' : 'Browser wallet' });
}
splashWalletButton.innerHTML = `<span class="splash-wallet-marks" aria-hidden="true">${Object.values(walletBrands).map(({ icon }) => walletIcon(icon)).join('')}</span><span>Connect wallet</span>`;
splashWalletButton.onclick = openWallet;
$('#welcome-guest').onclick = () => {
  connection.disconnect();
  void enter('guest');
};
walletButton.onclick = openWallet;
accountButton.onclick = openWallet;
$('#welcome-theme').onclick = () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  window.setTheme(theme);
  $('#welcome-theme').setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
};
updateHeader();
void configureAuth();
void configureNetwork();

let resumeGuest = false;
try { resumeGuest = sessionStorage.getItem(guestKey) === '1'; } catch {}
if (resumeGuest) enter('guest', false);
else loaderHide();
