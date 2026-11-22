const $=s=>document.querySelector(s);const money=(v,d=2)=>v==null?'Open chart':new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:d}).format(v);const num=v=>new Intl.NumberFormat('en-US',{maximumFractionDigits:5}).format(v);
const assets=[{name:'Bitcoin',symbol:'BTC',icon:'₿',price:97420.10,change:2.41,balance:.382,cls:'btc',type:'crypto'},{name:'Ethereum',symbol:'ETH',icon:'♦',price:3412.60,change:1.86,balance:5.24,cls:'eth',type:'crypto'},{name:'Solana',symbol:'SOL',icon:'≋',price:214.35,change:4.72,balance:36.8,cls:'sol',type:'crypto'},{name:'USD Coin',symbol:'USDC',icon:'$',price:1,change:.01,balance:10850.01,cls:'sol',type:'crypto'},{name:'NVIDIA',symbol:'NVDA',icon:'N',price:145.89,change:3.12,balance:40,type:'stocks'},{name:'Tesla',symbol:'TSLA',icon:'T',price:352.56,change:-1.24,balance:0,type:'stocks'},{name:'Apple',symbol:'AAPL',icon:'a',price:228.22,change:.84,balance:20,type:'stocks'},{name:'Dogecoin',symbol:'DOGE',icon:'Ð',price:.3842,change:12.84,balance:0,type:'memes',cls:'btc'},{name:'Pepe',symbol:'PEPE',icon:'◉',price:.0000214,change:18.62,balance:0,type:'memes',cls:'sol'},{name:'dogwifhat',symbol:'WIF',icon:'ŵ',price:3.12,change:-3.18,balance:0,type:'memes',cls:'eth'},{name:'Bonk',symbol:'BONK',icon:'b',price:.0000432,change:8.41,balance:0,type:'memes',cls:'btc'}];
assets.push(...[{"name": "XRP", "symbol": "XRP", "icon": "X", "price": null, "change": null, "balance": 0, "type": "crypto"}, {"name": "Cardano", "symbol": "ADA", "icon": "A", "price": null, "change": null, "balance": 0, "type": "crypto"}, {"name": "Avalanche", "symbol": "AVAX", "icon": "A", "price": null, "change": null, "balance": 0, "type": "crypto"}, {"name": "Chainlink", "symbol": "LINK", "icon": "L", "price": null, "change": null, "balance": 0, "type": "crypto"}, {"name": "Polkadot", "symbol": "DOT", "icon": "D", "price": null, "change": null, "balance": 0, "type": "crypto"}, {"name": "Litecoin", "symbol": "LTC", "icon": "L", "price": null, "change": null, "balance": 0, "type": "crypto"}, {"name": "Bitcoin Cash", "symbol": "BCH", "icon": "B", "price": null, "change": null, "balance": 0, "type": "crypto"}, {"name": "Uniswap", "symbol": "UNI", "icon": "U", "price": null, "change": null, "balance": 0, "type": "crypto"}, {"name": "Aave", "symbol": "AAVE", "icon": "A", "price": null, "change": null, "balance": 0, "type": "crypto"}, {"name": "NEAR", "symbol": "NEAR", "icon": "N", "price": null, "change": null, "balance": 0, "type": "crypto"}, {"name": "Sui", "symbol": "SUI", "icon": "S", "price": null, "change": null, "balance": 0, "type": "crypto"}, {"name": "Arbitrum", "symbol": "ARB", "icon": "A", "price": null, "change": null, "balance": 0, "type": "crypto"}, {"name": "Optimism", "symbol": "OP", "icon": "O", "price": null, "change": null, "balance": 0, "type": "crypto"}, {"name": "Microsoft", "symbol": "MSFT", "icon": "M", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "Amazon", "symbol": "AMZN", "icon": "A", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "Alphabet", "symbol": "GOOGL", "icon": "G", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "Meta", "symbol": "META", "icon": "M", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "Netflix", "symbol": "NFLX", "icon": "N", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "AMD", "symbol": "AMD", "icon": "A", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "Intel", "symbol": "INTC", "icon": "I", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "Coinbase", "symbol": "COIN", "icon": "C", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "Palantir", "symbol": "PLTR", "icon": "P", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "Strategy", "symbol": "MSTR", "icon": "M", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "JPMorgan", "symbol": "JPM", "icon": "J", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "Visa", "symbol": "V", "icon": "V", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "Disney", "symbol": "DIS", "icon": "D", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "Walmart", "symbol": "WMT", "icon": "W", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "Uber", "symbol": "UBER", "icon": "U", "price": null, "change": null, "balance": 0, "type": "stocks"}, {"name": "S&P 500 ETF", "symbol": "SPY", "icon": "S", "price": null, "change": null, "balance": 0, "type": "stocks"}]);
const zeroDemoAssets = [
  {name:'Zero',symbol:'ZRO',price:2.5,change:null,balance:1800,type:'crypto',demoLabel:'Native to Zero'},
  {name:'USD₮0',symbol:'USDT0',price:1,change:null,balance:600,type:'crypto',demoLabel:'Ecosystem example'},
  {name:'PayPal USD',symbol:'PYUSD',price:1,change:null,balance:250,type:'crypto',demoLabel:'Ecosystem example'},
  {name:'Wrapped eETH',symbol:'weETH',price:3250,change:null,balance:0.2,type:'crypto',demoLabel:'Ecosystem example'},
];
assets.unshift(...zeroDemoAssets);
const demoSwapTokens = zeroDemoAssets.map(asset=>asset.symbol);
const portfolioRanges = ['1D','1W','1M','3M','1Y','ALL'];
const demoStateKey='canopy-zero-state';
let stored;
try { stored=JSON.parse(localStorage.getItem(demoStateKey)); } catch {}
const nonnegative=(value,fallback)=>Number.isFinite(value)&&value>=0 ? value : fallback;
const state={
  version:2,
  balances:Object.fromEntries(zeroDemoAssets.map(asset=>[asset.symbol,nonnegative(stored?.balances?.[asset.symbol],asset.balance)])),
  staked:nonnegative(stored?.version===2 ? stored.staked : null,240),
  rewards:nonnegative(stored?.version===2 ? stored.rewards : null,12),
  activity:Array.isArray(stored?.activity)?stored.activity:[],
};
let page='portfolio',range='1W',market='stocks',holdTab='assets',miniTab='stocks';
const persist=()=>localStorage.setItem(demoStateKey,JSON.stringify(state));
const icons={portfolio:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',markets:'<path d="M4 19V12m8 7V5m8 14V9"/>',swap:'<path d="M4 7h16l-4-4M20 17H4l4 4"/>',stake:'<path d="M12 3v18M3 12h18M5.5 5.5l13 13m0-13-13 13"/>',activity:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>'};
icons.perps='<path d="M3 17l5-5 4 3 8-9M15 6h5v5"/>';
icons.rewards='<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M3 10h18V7H3zM12 7v14M12 7c-6 0-6-5-2-4 2 0 2 4 2 4Zm0 0c6 0 6-5 2-4-2 0-2 4-2 4Z"/>';
const names={portfolio:'Portfolio',markets:'Markets',swap:'Swap',stake:'Stake',perps:'Perps',rewards:'Rewards',activity:'Activity'};
const mobilePrimary=['portfolio','markets','swap','activity'];
function navIcon(pageName){return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[pageName]}</svg>`}
function nav(){
  const links=Object.keys(names).map(key=>`<a href="#${key}" title="${names[key]}" class="${page===key?'active':''} ${mobilePrimary.includes(key)?'nav-primary':'nav-secondary'}" ${page===key?'aria-current="page"':''}>${navIcon(key)}<span>${names[key]}</span></a>`);
  $('#nav').innerHTML=links.join('')+`<button id="more-nav" class="nav-more ${mobilePrimary.includes(page)?'':'active'}" aria-label="More pages" aria-haspopup="dialog"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg><span>More</span></button>`;
  $('#breadcrumb').textContent=names[page];
  $('#more-nav').onclick=()=>{
    showModal(`<h2>More from Canopy Zero</h2><div class="more-pages">${Object.keys(names).filter(key=>!mobilePrimary.includes(key)).map(key=>`<a href="#${key}" class="more-page ${page===key?'selected':''}">${navIcon(key)}<span>${names[key]}</span></a>`).join('')}</div>`);
    document.querySelectorAll('.more-page').forEach(link=>link.onclick=()=>$('#modal').close());
  };
}
const coin=a=>CanopyUI.token(a.symbol,a.name);
const assetName=a=>`<div class="asset-name">${coin(a)}<div><b>${a.name}</b><small>${a.symbol}</small></div></div>`;
const chg=a=>a.change==null?'<span class="muted">Exchange chart</span>':`<span class="${a.change>=0?'positive':'negative'}">${a.change>=0?'+':''}${a.change.toFixed(2)}%</span>`;
function spark(seed=0,negative=false){let values=Array.from({length:26},(_,i)=>32-i*.65+Math.sin(i*1.9+seed)*6+Math.cos(i*.7+seed)*4);if(negative)values=values.map(v=>40-v);return `<svg class="sparkline" viewBox="0 0 100 45" preserveAspectRatio="none" aria-hidden="true"><path d="${values.map((v,i)=>(i?'L':'M')+(i*4)+','+v).join(' ')}" fill="none" stroke="${negative?'#f39a92':'var(--lime)'}" stroke-width="1.5"/></svg>`}
function chart(seed=0){const values=Array.from({length:100},(_,i)=>159-i*1.1+Math.sin(i*.27+seed)*13+Math.sin(i*1.7)*5+Math.cos(i*.7)*7);const path=values.map((v,i)=>(i?'L':'M')+(i*7.4).toFixed(1)+','+v.toFixed(1)).join(' ');return `<svg viewBox="0 0 740 210" preserveAspectRatio="none" role="img" aria-label="Illustrative portfolio performance trending upward"><defs><linearGradient id="fill${seed}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c5f879" stop-opacity=".15"/><stop offset="1" stop-color="#c5f879" stop-opacity="0"/></linearGradient></defs>${[45,95,145,195].map(y=>`<line x1="0" x2="740" y1="${y}" y2="${y}" stroke="#ffffff08" stroke-dasharray="3 5"/>`).join('')}<path d="${path} L733 210 L0 210 Z" fill="url(#fill${seed})"/><path d="${path}" stroke="var(--lime)" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"/><circle cx="732.6" cy="${values[99]}" r="4" fill="var(--lime)" stroke="#24321b" stroke-width="5"/></svg>`}
function heading(title,sub,actions=''){return `<div class="page-heading"><div><h1>${title}</h1><p class="subtitle">${sub}</p></div><div class="buttons">${actions}</div></div>`}
let watchlist;try{watchlist=JSON.parse(localStorage.getItem('canopy-zero-watchlist'))}catch{}if(!Array.isArray(watchlist))watchlist=['ZRO','USDT0','weETH'];let selectedSymbol='NVDA';
const tvSymbols={ZRO:'COINBASE:ZROUSD',BTC:'COINBASE:BTCUSD',ETH:'COINBASE:ETHUSD',SOL:'COINBASE:SOLUSD',USDC:'COINBASE:USDCUSD',NVDA:'NASDAQ:NVDA',TSLA:'NASDAQ:TSLA',AAPL:'NASDAQ:AAPL',DOGE:'BINANCE:DOGEUSDT',PEPE:'BINANCE:PEPEUSDT',WIF:'BINANCE:WIFUSDT',BONK:'BINANCE:BONKUSDT'};
Object.assign(tvSymbols,{"XRP": "BINANCE:XRPUSDT", "ADA": "BINANCE:ADAUSDT", "AVAX": "BINANCE:AVAXUSDT", "LINK": "BINANCE:LINKUSDT", "DOT": "BINANCE:DOTUSDT", "LTC": "BINANCE:LTCUSDT", "BCH": "BINANCE:BCHUSDT", "UNI": "BINANCE:UNIUSDT", "AAVE": "BINANCE:AAVEUSDT", "NEAR": "BINANCE:NEARUSDT", "SUI": "BINANCE:SUIUSDT", "ARB": "BINANCE:ARBUSDT", "OP": "BINANCE:OPUSDT", "MSFT": "NASDAQ:MSFT", "AMZN": "NASDAQ:AMZN", "GOOGL": "NASDAQ:GOOGL", "META": "NASDAQ:META", "NFLX": "NASDAQ:NFLX", "AMD": "NASDAQ:AMD", "INTC": "NASDAQ:INTC", "COIN": "NASDAQ:COIN", "PLTR": "NASDAQ:PLTR", "MSTR": "NASDAQ:MSTR", "JPM": "NYSE:JPM", "V": "NYSE:V", "DIS": "NYSE:DIS", "WMT": "NASDAQ:WMT", "UBER": "NYSE:UBER", "SPY": "AMEX:SPY"});
function liveChart(symbol, id, market = tvSymbols[symbol]) {
  if (!market) {
    return `<div class="chart-unavailable" role="status"><strong>Chart unavailable</strong><p>No exchange chart is available for ${symbol}.</p></div>`;
  }
  return `<div class="live-chart" id="${id}" data-tv="${market}" data-chart-title="${symbol}"></div>
    <div class="chart-source"><a href="https://www.tradingview.com/chart/?symbol=${encodeURIComponent(market)}" target="_blank" rel="noopener">Open on TradingView</a><span>Exchange data · Separate from demo quotes</span></div>`;
}

function hydrateCharts() {
  document.querySelectorAll('[data-tv]:not([data-loaded])').forEach(el => {
    if (el.closest('details:not([open])')) return;
    el.dataset.loaded = 'true';
    const frame = document.createElement('iframe');
    frame.className = 'isolated-chart';
    frame.title = `${el.dataset.chartTitle} market chart`;
    frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox');
    frame.referrerPolicy = 'no-referrer';
    const options = {
      autosize: true,
      width: '100%',
      height: '100%',
      symbol: el.dataset.tv,
      interval: '60',
      timezone: 'Etc/UTC',
      theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
      style: '1',
      locale: 'en',
      allow_symbol_change: false,
      hide_side_toolbar: true,
      support_host: 'https://www.tradingview.com'
    };
    frame.src = 'https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=en#'
      + encodeURIComponent(JSON.stringify(options));
    el.append(frame);
  });
}
function portfolio(){
  const held=zeroDemoAssets.filter(asset=>state.balances[asset.symbol]>0);
  const total=held.reduce((sum,asset)=>sum+state.balances[asset.symbol]*asset.price,0)+(state.staked+state.rewards)*zeroDemoAssets[0].price;
  const allocation=zeroDemoAssets.map((asset,index)=>{
    const units=state.balances[asset.symbol]+(asset.symbol==='ZRO'?state.staked+state.rewards:0);
    return {symbol:asset.symbol,value:units*asset.price,color:['var(--lime)','#58a6a5','#778bce','#a89bdd'][index]};
  }).filter(asset=>asset.value>0);
  const [dollars,cents]=money(total).split('.');
  return heading('Portfolio','Your Zero demo holdings and staking positions.')+`
  <div class="overview-layout">
    <section class="balance-panel">
      <div class="card-top"><h2>Overview</h2><span class="tag">Zero · Demo</span></div>
      <div class="label balance-label">Estimated portfolio value</div><div class="big-number">${dollars}<span class="cents">.${cents}</span></div>
      <p class="data-caption portfolio-history-label">Illustrative portfolio history</p>
      <div class="chart-wrap" id="portfolio-chart">${chart(portfolioRanges.indexOf(range))}</div>
      <div class="chart-foot"><div class="ranges" aria-label="Portfolio chart range">${portfolioRanges.map(r=>`<button class="${r===range?'active':''}" data-range="${r}" aria-pressed="${r===range}">${r}</button>`).join('')}</div></div>
      <div class="stat-row zero-stats"><div><span class="label">Staked</span><div class="value">${num(state.staked)} ZRO</div></div><div><span class="label">Rewards</span><div class="value positive">${num(state.rewards)} ZRO</div></div></div>
    </section>
    <aside class="portfolio-rail">
      <section class="allocation-block"><div class="card-top"><h2>Allocation</h2><span class="tag">${allocation.length} assets</span></div>
        ${allocation.length?`<div class="allocation-bar">${allocation.map(asset=>`<span style="width:${asset.value/total*100}%;background:${asset.color}" title="${asset.symbol}"></span>`).join('')}</div>${allocation.map(asset=>`<div class="allocation-item"><span><i style="background:${asset.color}"></i>${asset.symbol}</span><b>${(asset.value/total*100).toFixed(1)}%</b></div>`).join('')}`:'<p class="form-note">No demo holdings yet.</p>'}
      </section>
      <section class="watchlist"><div class="card-top"><h2>Watchlist</h2><button class="quiet" data-go="markets">Edit</button></div>
        ${zeroDemoAssets.filter(asset=>watchlist.includes(asset.symbol)).map(asset=>`<button class="watch-row" data-asset="${asset.symbol}">${coin(asset)}<span>${asset.symbol}<small>${asset.name}</small></span><span class="watch-price">${money(asset.price)}</span></button>`).join('')||'<p class="form-note">Pin demo tokens from Markets to follow them here.</p>'}<span class="data-caption">Sample prices</span>
      </section>
    </aside>
  </div>
  <section class="holdings">
    <div class="card-top"><div class="section-tabs"><button data-hold="assets" class="${holdTab==='assets'?'active':''}">Holdings <span class="count">${held.length}</span></button><button data-hold="activity" class="${holdTab==='activity'?'active':''}">Recent activity</button></div><span class="data-caption">Sample balances</span></div>
    ${holdTab==='activity'?activityRows():`<table><thead><tr><th>Asset</th><th class="price-col">Sample price</th><th>Balance</th></tr></thead><tbody>${held.map(asset=>`<tr><td><button class="quiet asset-button" data-asset="${asset.symbol}">${assetName(asset)}</button></td><td class="price-col">${money(asset.price)}</td><td>${money(asset.price*state.balances[asset.symbol])}<small>${num(state.balances[asset.symbol])} ${asset.symbol}</small></td></tr>`).join('')}</tbody></table>`}
    ${holdTab==='assets'?'<p class="form-note">ZRO is native to Zero. The other holdings are LayerZero ecosystem examples with simulated balances.</p>':''}
  </section>`;
}

function marketRadar(){
  const choices=[['stocks','Stocks'],['memes','Memes']];
  return `<section class="discovery market-radar" aria-labelledby="radar-title"><div class="card-top"><h2 id="radar-title">On your radar</h2><div class="section-tabs">${choices.map(([type,label])=>`<button class="${miniTab===type?'active':''}" data-mini="${type}" aria-pressed="${miniTab===type}">${label}</button>`).join('')}</div></div><div class="discovery-grid">${assets.filter(asset=>asset.type===miniTab).slice(0,4).map((asset,index)=>`<button class="discovery-tile tile-${index}" data-asset="${asset.symbol}"><div class="token-art">${coin(asset)}</div><div class="tile-info"><strong>${asset.name}</strong>${chg(asset)}</div><div class="tile-meta">${asset.symbol}<span>Open market chart</span></div></button>`).join('')}</div></section>`;
}
let tradeMode = 'swap';
const bridgeTokens = ['ZRO'];
const bridgeNetworks = ['Ethereum', 'Zero (demo)'];
const tradeDrafts = {
  swap: {from: 'ZRO', to: 'USDT0', amount: '1', chartOpen: true},
  bridge: {from: 'ZRO', to: 'ZRO', amount: '100', source: 'Ethereum', destination: 'Zero (demo)'}
};

function tradeOptions(items, selected) {
  return items.map(item => `<option ${item === selected ? 'selected' : ''}>${item}</option>`).join('');
}

function demoTrade() {
  const action = tradeMode;
  const bridge = action === 'bridge';
  const draft = tradeDrafts[action];
  const tokens = bridge ? bridgeTokens : demoSwapTokens;
  const subtitle = bridge ? 'Preview a ZRO transfer between Ethereum and Zero.' : 'Try a swap with sample LayerZero ecosystem assets.';
  return heading('Swap', subtitle, '<span class="tag">Demo Mode</span>') + `
    <div class="page-grid">
      <section class="card trade-card">
        <div class="trade-tabs" role="group" aria-label="Trade mode">
          <a href="#swap" ${bridge ? '' : 'class="active" aria-current="page"'}>Swap</a>
          <a href="#swap/bridge" ${bridge ? 'class="active" aria-current="page"' : ''}>Bridge</a>
        </div>
        ${bridge ? `<div class="network-row">
          <label>From network<select class="network-select" id="from-network">${tradeOptions(bridgeNetworks, draft.source)}</select></label>
          <label>To network<select class="network-select" id="to-network">${tradeOptions(bridgeNetworks, draft.destination)}</select></label>
        </div>` : ''}
        <div class="field-box">
          <div class="field-top"><span>You ${bridge ? 'bridge' : 'pay'}</span><span id="balance-label"></span></div>
          <div class="amount-row">
            <input aria-label="Amount to ${action}" id="amount" type="number" inputmode="decimal" min="0" step="any" placeholder="0.00">
            <span id="pay-token-logo" class="inline-token"></span>
            <select aria-label="Pay asset" id="from-asset">${tradeOptions(tokens, draft.from)}</select>
          </div>
          <div class="field-bottom"><span id="pay-usd"></span><button id="max">Use max</button></div>
        </div>
        <button class="switch" id="reverse" aria-label="Reverse ${bridge ? 'networks' : 'assets'}">
          ${CanopyUI.graphic('<path d="M8 17V7m-3 3 3-3 3 3m5-3v10m-3-3 3 3 3-3"/>')}
        </button>
        <div class="field-box">
          <div class="field-top"><span>You receive</span><span>Estimated</span></div>
          <div class="amount-row">
            <input aria-label="Estimated received amount" id="receive" readonly>
            <span id="receive-token-logo" class="inline-token"></span>
            <select aria-label="Receive asset" id="to-asset" ${bridge ? 'disabled' : ''}>${tradeOptions(tokens, draft.to)}</select>
          </div>
          <div class="field-bottom"><span id="receive-usd"></span><span>${bridge ? 'Same wallet address' : 'Includes demo fee'}</span></div>
        </div>
        <div class="trade-details">
          <div><span>${bridge ? 'Illustrative arrival' : 'Sample exchange rate'}</span><b id="rate">~2 minutes</b></div>
          <div><span>${bridge ? 'Bridge fee' : 'Trading fee'}</span><b>${bridge ? '0.1%' : '0.3%'}</b></div>
          <div><span>Network fee</span><b>Illustrative · $0.08</b></div>
        </div>
        <button class="primary full" id="review-trade">Review demo ${action}</button>
        <p class="form-note">${bridge ? 'Simulated transfer. No ZRO moves.' : 'ZRO is Zero’s native token. Other tokens are ecosystem examples and their availability on Zero is unverified.'}</p>
      </section>
      <section class="trade-context">
        ${bridge ? `<div class="card route-panel">
          <div class="card-top"><h2>Transfer route</h2><span class="tag">Simulation</span></div>
          <div class="route-stops">
            <div><span class="route-icon" id="route-from-icon"></span><div><small>FROM</small><h3 id="route-from"></h3></div></div>
            <div class="route-line"><i></i><span>Bridge</span><i></i></div>
            <div><span class="route-icon destination" id="route-to-icon"></span><div><small>TO</small><h3 id="route-to"></h3></div></div>
          </div>
          <p class="form-note">This preview records the transfer in Activity. It does not use a bridge protocol or update destination balances.</p>
        </div>` : `<details class="card context-chart swap-chart-panel" id="swap-chart-panel" ${draft.chartOpen ? 'open' : ''}>
          <summary class="card-top">
            <h2 class="chart-asset-title" id="swap-pair"></h2>
            <span class="swap-chart-control"><span class="swap-chart-label"></span>${CanopyUI.graphic('<path d="m6 9 6 6 6-6"/>')}</span>
          </summary>
          <div id="swap-chart-content"></div>
        </details>`}
        <div class="recent-panel">
          <div class="card-top"><h2>Recent ${bridge ? 'transfers' : 'swaps'}</h2><button class="quiet" data-go="activity">View activity</button></div>
          ${activityRows(bridge ? 'Bridge' : 'Swap')}
        </div>
      </section>
    </div>`;
}

function mountDemoTrade() {
  const bridge = tradeMode === 'bridge';
  const draft = tradeDrafts[tradeMode];
  const from = $('#from-asset');
  const to = $('#to-asset');
  const amount = $('#amount');
  const source = $('#from-network');
  const destination = $('#to-network');
  amount.value = draft.amount;
  amount.addEventListener('input', updateQuote);

  // Keep the two tokens distinct when either picker selects the token on the other side.
  from.onchange = () => {
    if (!bridge && from.value === to.value) to.value = draft.from;
    updateQuote();
  };
  to.onchange = () => {
    if (!bridge && from.value === to.value) from.value = draft.to;
    updateQuote();
  };
  if (bridge) {
    source.onchange = updateQuote;
    destination.onchange = updateQuote;
  } else {
    const chartPanel = $('#swap-chart-panel');
    chartPanel.addEventListener('toggle', () => {
      if (!chartPanel.isConnected) return;
      draft.chartOpen = chartPanel.open;
      if (chartPanel.open) hydrateCharts();
    });
  }
  $('#max').onclick = () => {
    amount.value = state.balances[from.value];
    updateQuote();
  };
  $('#reverse').onclick = () => {
    if (bridge) {
      [source.value, destination.value] = [destination.value, source.value];
    } else {
      [from.value, to.value] = [to.value, from.value];
    }
    updateQuote();
  };
  $('#review-trade').onclick = reviewTrade;
  updateQuote();
}

function updateSwapChart(from, to) {
  const panel = $('#swap-chart-panel');
  const key = `${from}/${to}`;
  if (panel.dataset.pair === key) return;
  panel.dataset.pair = key;
  const pair = `${from} / ${to}`;
  $('#swap-pair').innerHTML = `<span class="swap-pair-logos">${CanopyUI.token(from)}${CanopyUI.token(to)}</span><span>${pair}</span>`;
  const reference = !tvSymbols[pair] && [from,to].includes('ZRO')
    ? '<div class="chart-source"><a href="https://www.kraken.com/prices/layerzero" target="_blank" rel="noopener">View external ZRO / USD reference</a></div>'
    : '';
  $('#swap-chart-content').innerHTML = liveChart(pair, 'swap-chart') + reference;
  hydrateCharts();
}

function bridgeNetworkIcon(network) {
  if (network === 'Zero (demo)') return CanopyUI.token('ZRO');
  return CanopyUI.network(network);
}
function markets(){return heading('Markets','Price action, watchlists, and what’s moving.',`<span class="tag">Charts powered by TradingView</span>`)+marketRadar()+`<div class="market-controls"><div class="segments">${[['stocks','Stocks'],['crypto','Crypto'],['memes','Trending memes']].map(([v,n])=>`<button class="${market===v?'active':''}" data-market="${v}">${n}</button>`).join('')}</div><input class="search" id="search" aria-label="Search markets" placeholder="Search name or symbol"></div><section class="market-terminal"><div class="market-sidebar"><div class="card-top"><h2>${market==='memes'?'Meme watch':market==='stocks'?'Stock watch':'Crypto watch'}</h2><span class="data-caption">Sample list</span></div><div id="market-rows">${marketRows('')}</div></div><div class="market-chart-panel"><div class="card-top"><h2 id="selected-market">${marketChartTitle(selectedSymbol)}</h2><span class="data-caption">Exchange data · May be delayed</span></div><div id="market-live">${liveChart(selectedSymbol,'markets-chart')}</div></div></section><div class="market-bottom"><span>★ Pin demo tokens to your portfolio watchlist.</span><span>Quotes in this list are samples. Open a chart for exchange data.</span></div>`}
function marketChartTitle(symbol){
  const asset=assets.find(item=>item.symbol===symbol);
  const quote=tvSymbols[symbol]?.endsWith('USDT')?'USDT':'USD';
  return coin(asset)+(tvSymbols[symbol]&&asset.type!=='stocks'?`${symbol} / ${quote}`:symbol);
}
function marketRows(q){let list=assets.filter(a=>a.type===market&&`${a.name} ${a.symbol}`.toLowerCase().includes(q.toLowerCase()));return list.length?list.map(a=>`<div class="market-row ${selectedSymbol===a.symbol?'selected':''}"><button class="pin ${watchlist.includes(a.symbol)?'pinned':''}" data-pin="${a.symbol}" aria-label="${watchlist.includes(a.symbol)?'Unpin':'Pin'} ${a.name}">${watchlist.includes(a.symbol)?'★':'☆'}</button><button class="market-select" data-select-market="${a.symbol}">${assetName(a)}<span>${a.demoLabel?a.demoLabel:money(a.price,a.price<.01?7:2)}<small>${a.demoLabel?(tvSymbols[a.symbol]?'Exchange chart':'No chart data'):chg(a)}</small></span></button></div>`).join(''):'<div class="empty">No matching assets.</div>'}
function stake(){
  const zro=zeroDemoAssets[0];
  return heading('Stake','Try delegating sample ZRO in Demo Mode.')+`
  <div class="staking-hero"><section class="card staking-total"><div class="label">Your staked balance</div><div class="big-number">${num(state.staked)} ZRO</div><div class="stat-row zero-stats"><div><span class="label">Demo rewards</span><div class="value">${num(state.rewards)} ZRO</div></div><div><button class="secondary" data-action="claim" ${state.rewards<=0?'disabled':''}>Claim demo rewards</button></div></div></section>
  <section class="card staking-card">${assetName(zro)}<h2>Delegate ZRO</h2><p>Available in demo: ${num(state.balances.ZRO)} ZRO</p><button class="secondary" data-stake="ZRO" ${state.balances.ZRO<=0?'disabled':''}>Stake demo ZRO</button></section></div>`;
}
function activityRows(kind){const events=state.activity.filter(entry=>!kind||entry.type===kind);return events.length?events.slice().reverse().map(a=>`<div class="activity-row"><span class="coin">${a.type==='Swap'?'⇄':a.type==='Stake'?'✳':'◈'}</span><div>${a.type}<small>${a.detail}</small></div><span class="positive">Simulated<small>${a.time}</small></span></div>`).join(''):'<div class="empty"><div style="font-size:30px;margin-bottom:14px">◷</div>No moves yet.<small>Your demo swaps, bridges, and staking activity will appear here.</small></div>'}
function activity(){return heading('Activity','History of your simulated transfers, swaps, and staking.')+`<section class="card activity-card">${activityRows()}</section>`}
function comingSoon(section){
  const perps=section==='perps';
  const title=perps?'Perps':'Rewards';
  const subtitle=perps?'Perpetual markets on Zero.':'One place to see your rewards.';
  const description=perps?'Explore perpetual markets and manage positions here once a Zero venue is integrated.':'Track eligibility and claim rewards here once a rewards program is available.';
  return heading(title,subtitle)+`<section class="card zero-roadmap"><div class="zero-roadmap-mark">${navIcon(section)}</div><span class="tag">Coming soon</span><h2>${perps?'A place for your positions.':'Your rewards, in one view.'}</h2><p>${description}</p><a class="secondary" href="#${perps?'markets':'portfolio'}">${perps?'Explore markets':'Back to portfolio'}</a></section>`;
}
function render(){
  range='1W';
  const [fragment, mode] = location.hash.slice(1).split('/');
  // The submitted #testnet and older #bridge URLs still open the trade workspace.
  const route = fragment === 'testnet' || fragment === 'bridge' ? 'swap' : fragment;
  tradeMode = fragment === 'bridge' || (fragment === 'swap' && mode === 'bridge') ? 'bridge' : 'swap';
  page=Object.hasOwn(names,route)?route:'portfolio';
  nav();
  const views={portfolio,markets,swap:demoTrade,stake,perps:()=>comingSoon('perps'),rewards:()=>comingSoon('rewards'),activity};
  $('#main').innerHTML=views[page]();
  if(page==='swap') mountDemoTrade();
  if(page==='markets') $('#search').oninput=e=>$('#market-rows').innerHTML=marketRows(e.target.value);
  hydrateCharts();
  CanopyUI.enter($('#main'));
}
function updateQuote() {
  const bridge = tradeMode === 'bridge';
  const draft = tradeDrafts[tradeMode];
  const from = $('#from-asset').value;
  const fromAsset = assets.find(asset => asset.symbol === from);
  if (bridge) {
    $('#to-asset').value = from;
    draft.source = $('#from-network').value;
    draft.destination = $('#to-network').value;
    $('#route-from').textContent = draft.source;
    $('#route-to').textContent = draft.destination;
    $('#route-from-icon').innerHTML = bridgeNetworkIcon(draft.source);
    $('#route-to-icon').innerHTML = bridgeNetworkIcon(draft.destination);
  }
  const to = $('#to-asset').value;
  const toAsset = assets.find(asset => asset.symbol === to);
  const amountField = $('#amount');
  const amount = Number(amountField.value);
  const validAmount = Number.isFinite(amount) && amount > 0;
  const balance = state.balances[from] ?? 0;
  const rate = fromAsset.price / toAsset.price;
  const received = validAmount ? Number((amount * rate * (bridge ? 0.999 : 0.997)).toFixed(7)) : 0;
  const error = !validAmount ? 'Enter an amount'
    : amount > balance ? 'Insufficient demo balance'
    : bridge && draft.source === draft.destination ? 'Choose different networks'
    : !bridge && from === to ? 'Choose different assets'
    : received <= 0 ? 'Amount too small'
    : '';
  Object.assign(draft, {from, to, amount: amountField.value});
  $('#pay-token-logo').innerHTML = CanopyUI.token(from);
  $('#receive-token-logo').innerHTML = CanopyUI.token(to);
  $('#receive').value = validAmount ? received : '';
  $('#balance-label').textContent = `Balance: ${num(balance)} ${from}`;
  $('#pay-usd').textContent = money(validAmount ? amount * fromAsset.price : 0);
  $('#receive-usd').textContent = money(received * toAsset.price);
  if (!bridge) {
    $('#rate').textContent = `1 ${from} = ${rate.toLocaleString('en-US', {maximumSignificantDigits: 6})} ${to}`;
    updateSwapChart(from, to);
  }
  const review = $('#review-trade');
  review.disabled = Boolean(error);
  review.textContent = error || `Review demo ${tradeMode}`;
}

function showModal(html){$('#modal').classList.remove('chart-modal');$('#modal-content').innerHTML=`<button class="close" aria-label="Close dialog">×</button>${html}`;$('#modal').showModal();CanopyUI.enter($('#modal-content'));$('.close').onclick=()=>$('#modal').close()}
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),3200)}
function log(type,detail){state.activity.push({type,detail,time:new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})});persist()}
let simulatingTrade = false;
function reviewTrade() {
  if (simulatingTrade) {
    toast('A demo transaction is already in progress.');
    return;
  }
  const action = tradeMode;
  const bridge = action === 'bridge';
  const from = $('#from-asset').value;
  const to = $('#to-asset').value;
  const amount = Number($('#amount').value);
  const received = Number($('#receive').value);
  const route = bridge ? `${$('#from-network').value} to ${$('#to-network').value}` : '';
  const activityType = bridge ? 'Bridge' : 'Swap';
  showModal(`<div class="modal-icon">${bridge ? '◎' : '⇄'}</div>
    <h2>Review demo ${action}</h2>
    <p>${bridge ? route : 'Check amounts and fees before confirming.'}</p>
    <div class="trade-details">
      <div><span>You pay</span><b>${num(amount)} ${from}</b></div>
      <div><span>You receive</span><b>${num(received)} ${to}</b></div>
      <div><span>Mode</span><b>Simulation only</b></div>
    </div>
    <p>${bridge ? 'This records a demo bridge route. Destination balances are not connected.' : 'This updates your local demo balances.'} No real assets will move.</p>
    <button class="primary full" id="confirm">Simulate ${action}</button>`);
  const button = $('#confirm');
  button.onclick = async () => {
    if (simulatingTrade) return;
    simulatingTrade = true;
    button.disabled = true;
    button.textContent = 'Simulating…';
    const progress = document.createElement('div');
    progress.innerHTML = CanopyUI.progress(`Simulating your ${action}`, 'Demo Mode · No onchain transaction.');
    button.before(progress);
    CanopyUI.transaction(`${activityType} simulation in progress`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const modal = $('#modal');
    try {
      if (amount > (state.balances[from] ?? 0)) throw Error('Insufficient demo balance.');
      if (!bridge) {
        state.balances[from] -= amount;
        state.balances[to] = (state.balances[to] ?? 0) + received;
      }
      log(activityType, bridge ? `${num(amount)} ${from} · ${route}` : `${num(amount)} ${from} to ${num(received)} ${to}`);
      if (modal.open && modal.contains(button)) modal.close();
      render();
      toast(`${activityType} simulation complete`);
      CanopyUI.transaction(`${activityType} simulation complete`, false);
    } catch (error) {
      progress.textContent = error.message;
      CanopyUI.transaction('Demo transaction could not complete', false, 'error');
      button.disabled = false;
      button.textContent = `Simulate ${action}`;
    } finally {
      simulatingTrade = false;
    }
  };
}
function assetDetail(symbol){
  const asset=assets.find(item=>item.symbol===symbol);
  if(!asset)return;
  const inDemo=demoSwapTokens.includes(symbol);
  showModal(`<div class="asset-name" style="margin-bottom:22px">${coin(asset)}<div><h2 style="margin:0">${asset.name}</h2><small>${symbol}${asset.demoLabel?' · '+asset.demoLabel:''}</small></div></div>${liveChart(symbol,'detail-chart')}<div class="modal-actions"><button class="secondary" data-pin="${symbol}">${watchlist.includes(symbol)?'Remove from watchlist':'Add to watchlist'}</button>${inDemo?'<button class="primary" id="trade-asset">Open swap</button>':''}</div>`);
  $('#modal').classList.add('chart-modal');
  hydrateCharts();
  if(inDemo)$('#trade-asset').onclick=()=>{
    tradeDrafts.swap.from=symbol;
    if(tradeDrafts.swap.to===symbol) tradeDrafts.swap.to=demoSwapTokens.find(token=>token!==symbol);
    $('#modal').close();
    location.hash='swap';
  };
}
function stakeModal(symbol){
  if(symbol!=='ZRO')return;
  showModal(`<h2>Stake demo ZRO</h2><p>Move sample ZRO from your available balance to your staked total.</p><label class="modal-label" for="stake-amount">Amount · Available ${num(state.balances.ZRO)} ZRO</label><input class="modal-input" type="number" min="0" step="any" id="stake-amount" value="${Math.min(1,state.balances.ZRO)}"><p id="stake-error" class="negative" role="status"></p><button class="primary full" id="confirm-stake">Simulate stake</button>`);
  $('#confirm-stake').onclick=()=>{
    const amount=Number($('#stake-amount').value);
    if(!Number.isFinite(amount)||amount<=0||amount>state.balances.ZRO){$('#stake-error').textContent='Enter an amount within your available balance.';return;}
    state.balances.ZRO-=amount;
    state.staked+=amount;
    log('Stake',`${num(amount)} ZRO`);
    $('#modal').close();render();toast(`${num(amount)} ZRO staked in demo`);
  };
}
function claimDemoRewards(){
  if(state.rewards<=0)return;
  showModal(`<h2>Claim your demo rewards</h2><p>Move ${num(state.rewards)} sample ZRO to your available balance.</p><button class="primary full" id="confirm-claim">Simulate claim</button>`);
  $('#confirm-claim').onclick=()=>{
    const rewards=state.rewards;
    state.balances.ZRO+=rewards;
    state.rewards=0;
    log('Claim',`${num(rewards)} ZRO rewards`);
    $('#modal').close();render();toast('Demo rewards claimed');
  };
}
document.addEventListener('click',event=>{
  const button=event.target.closest('button, tr[data-asset]');
  if(!button)return;
  const action=button.dataset;
  if(action.go)location.hash=action.go;
  if(action.range){
    range=action.range;
    document.querySelectorAll('[data-range]').forEach(element=>{
      const active=element.dataset.range===range;
      element.classList.toggle('active',active);
      element.setAttribute('aria-pressed',String(active));
    });
    $('#portfolio-chart').innerHTML=chart(portfolioRanges.indexOf(range));
  }
  if(action.market){market=action.market;selectedSymbol=assets.find(asset=>asset.type===market).symbol;render();}
  if(action.hold){holdTab=action.hold;render();}
  if(action.mini){miniTab=action.mini;render();}
  if(action.asset)assetDetail(action.asset);
  if(action.stake)stakeModal(action.stake);
  if(action.action==='claim')claimDemoRewards();
});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('tr[data-asset]'))assetDetail(e.target.dataset.asset)});
$('#reset').onclick=()=>{showModal('<h2>Start fresh?</h2><p>This resets only your local demo balances and simulated activity.</p><button class="primary full" id="confirm-reset">Reset demo</button>');$('#confirm-reset').onclick=()=>{localStorage.removeItem(demoStateKey);location.reload()}};
function setTheme(theme){document.documentElement.dataset.theme=theme;localStorage.setItem('canopy-zero-theme',theme);$('#appearance').setAttribute('aria-label',`Switch to ${theme==='light'?'dark':'light'} mode`);$('#appearance').title=`Switch to ${theme==='light'?'dark':'light'} mode`;$('#mobile-theme').setAttribute('aria-label',`Switch to ${theme==='light'?'dark':'light'} mode`);$('#appearance').innerHTML=theme==='light'?CanopyUI.moon:CanopyUI.sun;$('#mobile-theme').innerHTML=theme==='light'?CanopyUI.moon:CanopyUI.sun;document.querySelectorAll('[data-tv]').forEach(el=>{delete el.dataset.loaded;el.innerHTML=''});hydrateCharts()}
$('#mobile-theme').onclick=()=>$('#appearance').click();
$('#appearance').onclick=()=>setTheme(document.documentElement.dataset.theme==='light'?'dark':'light');
$('#global-search').onclick=()=>{location.hash='markets';render();$('#search').focus()};
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('#modal').open){e.preventDefault();$('#global-search').click()}});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.pin){const symbol=b.dataset.pin;watchlist=watchlist.includes(symbol)?watchlist.filter(x=>x!==symbol):[...watchlist,symbol];localStorage.setItem('canopy-zero-watchlist',JSON.stringify(watchlist));if(page==='markets')$('#market-rows').innerHTML=marketRows($('#search').value);if($('#modal').open){b.textContent=watchlist.includes(symbol)?'Remove from watchlist':'Add to watchlist'}toast(watchlist.includes(symbol)?`${symbol} added to watchlist`:`${symbol} removed from watchlist`)}if(b.dataset.selectMarket){selectedSymbol=b.dataset.selectMarket;$('#selected-market').innerHTML=marketChartTitle(selectedSymbol);$('#market-live').innerHTML=liveChart(selectedSymbol,'markets-chart');$('#market-rows').innerHTML=marketRows($('#search').value);hydrateCharts()}});
setTheme(document.documentElement.dataset.theme||'light');
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0);$('.shell').scrollTo(0,0)});render();
