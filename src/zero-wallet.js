const accountPattern = /^0x[0-9a-f]{40}$/i;
const unavailable = 'Wallet account or network changed. Start sign-in again.';
const readAccount = accounts => Array.isArray(accounts) && accountPattern.test(accounts[0]) ? accounts[0] : '';

function readChainId(value) {
  if (typeof value !== 'string' || !/^0x[0-9a-f]{1,14}$/i.test(value)) return null;
  const chainId = Number(value);
  return Number.isSafeInteger(chainId) && chainId > 0 ? chainId : null;
}

export function walletError(error) {
  switch (Number(error?.code)) {
    case 4001: return 'Wallet request cancelled.';
    case -32002: return 'A request is already open in your wallet.';
    case 4100: return 'Authorize this site in your wallet, then try again.';
    case 4900:
    case 4901: return 'Your wallet is disconnected. Reconnect it and try again.';
    default: return error?.message || 'The wallet request could not be completed.';
  }
}

export function createWalletConnection(onChange) {
  let context = null;
  let handlers = null;
  let connecting = false;
  let revision = 0;

  function update(wallet, address, chainId) {
    if (context?.wallet === wallet && context.address.toLowerCase() === address.toLowerCase() && context.chainId === chainId) return;
    const previous = context;
    context = wallet ? Object.freeze({ wallet, address, chainId }) : null;
    onChange(context, previous);
  }

  function detach() {
    if (!handlers) return;
    const { provider, events } = handlers;
    for (const [name, handler] of Object.entries(events)) provider.removeListener?.(name, handler);
    handlers = null;
  }

  function disconnect() {
    revision++;
    detach();
    if (context) update(null);
  }

  function attach(wallet) {
    const { provider } = wallet;
    const events = {
      accountsChanged(accounts) {
        if (handlers?.events !== events) return;
        const address = readAccount(accounts);
        if (!address) disconnect();
        else update(wallet, address, context.chainId);
      },
      chainChanged(chain) {
        if (handlers?.events !== events) return;
        update(wallet, context.address, readChainId(chain));
      },
      disconnect() {
        if (handlers?.events === events) disconnect();
      },
    };
    handlers = { provider, events };
    for (const [name, handler] of Object.entries(events)) provider.on?.(name, handler);
  }

  async function connect(wallet) {
    if (connecting) throw Error('Finish the open wallet request first.');
    connecting = true;
    const requestedRevision = revision;
    try {
      const { provider } = wallet;
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      if (!readAccount(accounts)) throw Error('The wallet did not share an EVM account.');
      const [currentAccounts, chain] = await Promise.all([
        provider.request({ method: 'eth_accounts' }),
        provider.request({ method: 'eth_chainId' }),
      ]);
      const address = readAccount(currentAccounts);
      const chainId = readChainId(chain);
      if (!address || !chainId || requestedRevision !== revision) {
        throw Error('The wallet changed or disconnected during connection. Try again.');
      }
      detach();
      update(wallet, address, chainId);
      attach(wallet);
      return context;
    } finally {
      connecting = false;
    }
  }

  async function check(expected) {
    if (!expected || expected !== context || !expected.chainId) throw Error(unavailable);
    const { provider } = expected.wallet;
    const [accounts, chain] = await Promise.all([
      provider.request({ method: 'eth_accounts' }),
      provider.request({ method: 'eth_chainId' }),
    ]);
    if (expected !== context || readAccount(accounts).toLowerCase() !== expected.address.toLowerCase() || readChainId(chain) !== expected.chainId) {
      throw Error(unavailable);
    }
  }

  function signInAdapter(expected) {
    return {
      async request({ method, params }) {
        await check(expected);
        // Supabase asks for permission even when an authorized account is already selected.
        if (method === 'eth_requestAccounts' || method === 'eth_accounts') return [expected.address];
        if (method === 'eth_chainId') return `0x${expected.chainId.toString(16)}`;
        if (method !== 'personal_sign' || params?.[1]?.toLowerCase() !== expected.address.toLowerCase()) {
          throw Error('Unexpected wallet request during account sign-in.');
        }
        const signature = await expected.wallet.provider.request({ method, params });
        await check(expected);
        return signature;
      },
    };
  }

  return { connect, disconnect, current: () => context, check, signInAdapter };
}

function parseHttpsUrl(value) {
  if (typeof value !== 'string') throw Error('Expected a public HTTPS URL.');
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw Error('Expected a public HTTPS URL.');
  }
  return url;
}

export function parseZeroNetwork(network) {
  if (network == null) return null;
  if (typeof network.name !== 'string' || !network.name.trim() || !Number.isSafeInteger(network.chainId) || network.chainId <= 0) {
    throw Error('Invalid Zero network configuration.');
  }
  return Object.freeze({
    name: network.name.trim(),
    chainId: network.chainId,
    rpcUrl: parseHttpsUrl(network.rpcUrl).href,
    explorerUrl: network.explorerUrl == null ? null : parseHttpsUrl(network.explorerUrl).href,
    sourceUrl: parseHttpsUrl(network.sourceUrl).href,
  });
}

export function parseAuthConfig(config) {
  if (!config?.url && !config?.publishableKey) return null;
  const url = parseHttpsUrl(config.url);
  if (!/^[a-z0-9]+\.supabase\.co$/i.test(url.hostname) || url.pathname !== '/' || url.port) {
    throw Error('Invalid public account service URL.');
  }
  const key = config.publishableKey;
  if (typeof key !== 'string') throw Error('A public account service key is required.');
  if (!/^sb_publishable_[\w-]+$/.test(key)) {
    const parts = key.split('.');
    if (parts.length !== 3 || !/^[\w-]+$/.test(parts[1])) throw Error('Use a public publishable or anon key.');
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.role !== 'anon') throw Error('Use a public publishable or anon key.');
  }
  return { url: url.origin, key };
}
