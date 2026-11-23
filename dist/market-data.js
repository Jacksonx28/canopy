(() => {
  const coinIds = {
    ZRO: 'layerzero', USDT0: 'usdt0', PYUSD: 'paypal-usd', weETH: 'wrapped-eeth',
    BTC: 'bitcoin', ETH: 'ethereum', SOL: 'solana', USDC: 'usd-coin',
    DOGE: 'dogecoin', PEPE: 'pepe', WIF: 'dogwifcoin', BONK: 'bonk',
    XRP: 'ripple', ADA: 'cardano', AVAX: 'avalanche-2', LINK: 'chainlink',
    DOT: 'polkadot', LTC: 'litecoin', BCH: 'bitcoin-cash', UNI: 'uniswap',
    AAVE: 'aave', NEAR: 'near', SUI: 'sui', ARB: 'arbitrum', OP: 'optimism'
  };
  const symbolsById = new Map(Object.entries(coinIds).map(([symbol, id]) => [id, symbol]));
  const cacheKey = 'canopy-zero-crypto-quotes-v1';
  const cacheLifetime = 5 * 60_000;
  const providerLifetime = 60 * 60_000;
  const retryFloor = 60_000;
  const retryCeiling = 10 * 60_000;
  const params = new URLSearchParams({
    vs_currency: 'usd', ids: Object.values(coinIds).join(','), sparkline: 'true', price_change_percentage: '24h'
  });
  const endpoint = `https://api.coingecko.com/api/v3/coins/markets?${params}`;
  let quotes = new Map();
  let fetchedAt = null;
  let status = 'idle';
  let pending = null;
  let retryAt = 0;

  function isFresh(timestamp, lifetime) {
    const age = Date.now() - timestamp;
    return Number.isFinite(timestamp) && age >= 0 && age < lifetime;
  }

  function finite(value, nonnegative = false) {
    return Number.isFinite(value) && (!nonnegative || value >= 0) ? value : null;
  }

  function parseRows(rows) {
    const parsed = new Map();
    if (!Array.isArray(rows)) return parsed;
    for (const row of rows) {
      if (!row || !symbolsById.has(row.id)) continue;
      const updatedAt = Date.parse(row.last_updated);
      const price = finite(row.current_price, true);
      if (!isFresh(updatedAt, providerLifetime) || price === null) continue;
      const raw = row.sparkline_in_7d?.price;
      const history = Array.isArray(raw) ? raw.slice(-168) : [];
      parsed.set(symbolsById.get(row.id), Object.freeze({
        price,
        change: finite(row.price_change_percentage_24h),
        volume: finite(row.total_volume, true),
        cap: finite(row.market_cap, true),
        history: Object.freeze(history.length < 2 || history.some(point => finite(point, true) === null) ? [] : history),
        source: 'CoinGecko', updatedAt
      }));
    }
    return parsed;
  }

  try {
    const saved = JSON.parse(sessionStorage.getItem(cacheKey));
    if (isFresh(saved?.fetchedAt, cacheLifetime)) {
      quotes = parseRows(saved.rows);
      if (quotes.size) {
        fetchedAt = saved.fetchedAt;
        status = 'ready';
      }
    }
  } catch {
    // The market page remains usable with browser storage disabled.
  }

  function get(symbol) {
    if (!isFresh(fetchedAt, cacheLifetime)) return null;
    const quote = quotes.get(symbol);
    return quote && isFresh(quote.updatedAt, providerLifetime) ? quote : null;
  }

  function retryDelay(response) {
    const value = response.headers?.get('Retry-After');
    if (!value) return retryFloor;
    const seconds = Number(value);
    const wait = Number.isFinite(seconds) ? seconds * 1000 : Date.parse(value) - Date.now();
    return Number.isFinite(wait) ? Math.max(retryFloor, Math.min(retryCeiling, wait)) : retryFloor;
  }

  async function request() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(endpoint, { signal: controller.signal, credentials: 'omit' });
      if (!response.ok) {
        retryAt = Date.now() + retryDelay(response);
        status = 'error';
        return;
      }
      const rows = await response.json();
      const parsed = parseRows(rows);
      if (!parsed.size) throw new Error('No current market quotes');
      quotes = parsed;
      fetchedAt = Date.now();
      retryAt = 0;
      status = 'ready';
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ fetchedAt, rows }));
      } catch {
        // Keep the current response in memory if the cache cannot be written.
      }
    } catch {
      retryAt = Date.now() + retryFloor;
      status = 'error';
    } finally {
      clearTimeout(timeout);
    }
  }

  function load() {
    if (pending) return pending;
    if (isFresh(fetchedAt, cacheLifetime) || Date.now() < retryAt) return Promise.resolve();
    status = 'loading';
    pending = request().finally(() => { pending = null; });
    return pending;
  }

  function state() {
    return status === 'ready' && !isFresh(fetchedAt, cacheLifetime) ? 'idle' : status;
  }

  window.CanopyMarketData = Object.freeze({ get, load, state });
})();
