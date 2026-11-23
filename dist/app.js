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
const marketBenchmarks = [
  {name:'S&P 500',symbol:'SPX',market:'SP:SPX',context:'US large caps',mark:'<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 12h8M12 8v8"/>'},
  {name:'Nasdaq 100',symbol:'NDX',market:'NASDAQ:NDX',context:'Nasdaq leaders',mark:'<path d="m4 16 5-5 4 3 7-7M15 7h5v5"/>'},
  {name:'Crypto market cap',symbol:'TOTAL',market:'CRYPTOCAP:TOTAL',context:'Total market value',mark:'<path d="M5 18v-5m7 5V6m7 12V9"/>'},
  {name:'Bitcoin dominance',symbol:'BTC.D',market:'CRYPTOCAP:BTC.D',context:'Bitcoin market share',mark:'<circle cx="12" cy="12" r="8"/><path d="M12 4v8l6 5"/>'},
].map(benchmark=>({...benchmark,type:'indices',price:null,change:null,balance:0}));
assets.push(...marketBenchmarks);
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
let page='portfolio',range='1W',holdTab='assets';
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
    showModal(`<h2>More from Canopy Zero</h2><div class="more-pages">${Object.keys(names).filter(key=>!mobilePrimary.includes(key)).map(key=>`<a href="#${key}" class="more-page ${page===key?'selected':''}">${navIcon(key)}<span>${names[key]}</span></a>`).join('')}</div><button type="button" class="quiet more-reset" data-action="reset-demo">Reset demo…</button>`);
    document.querySelectorAll('.more-page').forEach(link=>link.onclick=()=>$('#modal').close());
  };
}
const coin=a=>CanopyUI.token(a.symbol,a.name);
const assetName=a=>`<div class="asset-name">${coin(a)}<div><b>${a.name}</b><small>${a.symbol}</small></div></div>`;
const chg=a=>a.change==null?'<span class="muted">Exchange chart</span>':`<span class="${a.change>=0?'positive':'negative'}">${a.change>=0?'+':''}${a.change.toFixed(2)}%</span>`;
function spark(seed=0,negative=false){let values=Array.from({length:26},(_,i)=>32-i*.65+Math.sin(i*1.9+seed)*6+Math.cos(i*.7+seed)*4);if(negative)values=values.map(v=>40-v);return `<svg class="sparkline" viewBox="0 0 100 45" preserveAspectRatio="none" aria-hidden="true"><path d="${values.map((v,i)=>(i?'L':'M')+(i*4)+','+v).join(' ')}" fill="none" stroke="${negative?'#f39a92':'var(--lime)'}" stroke-width="1.5"/></svg>`}
function chart(seed=0){const values=Array.from({length:100},(_,i)=>159-i*1.1+Math.sin(i*.27+seed)*13+Math.sin(i*1.7)*5+Math.cos(i*.7)*7);const path=values.map((v,i)=>(i?'L':'M')+(i*7.4).toFixed(1)+','+v.toFixed(1)).join(' ');return `<svg viewBox="0 0 740 210" preserveAspectRatio="none" role="img" aria-label="Illustrative portfolio performance trending upward"><defs><linearGradient id="fill${seed}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c5f879" stop-opacity=".15"/><stop offset="1" stop-color="#c5f879" stop-opacity="0"/></linearGradient></defs>${[45,95,145,195].map(y=>`<line x1="0" x2="740" y1="${y}" y2="${y}" stroke="#ffffff08" stroke-dasharray="3 5"/>`).join('')}<path d="${path} L733 210 L0 210 Z" fill="url(#fill${seed})"/><path d="${path}" stroke="var(--lime)" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"/><circle cx="732.6" cy="${values[99]}" r="4" fill="var(--lime)" stroke="#24321b" stroke-width="5"/></svg>`}
function heading(title,sub,actions=''){return `<div class="page-heading"><div><h1>${title}</h1><p class="subtitle">${sub}</p></div><div class="buttons">${actions}</div></div>`}
const watchlistKey='canopy-zero-watchlist';
let watchlist;
try { watchlist=JSON.parse(localStorage.getItem(watchlistKey)); } catch {}
watchlist=Array.isArray(watchlist) ? [...new Set(watchlist)].filter(symbol=>assets.some(asset=>asset.symbol===symbol)) : ['ZRO','USDT0','weETH'];
const pinnedAssets=()=>watchlist.map(symbol=>assets.find(asset=>asset.symbol===symbol));
const starPath='<path d="M11.16 4.2a.93.93 0 0 1 1.68 0l2.06 4.17 4.6.67a.93.93 0 0 1 .52 1.59l-3.33 3.25.79 4.59a.93.93 0 0 1-1.36.98L12 17.28l-4.12 2.17a.93.93 0 0 1-1.36-.98l.79-4.59-3.33-3.25A.93.93 0 0 1 4.5 9.04l4.6-.67 2.06-4.17Z"/>';
function pinContents(pinned, labelled){
  return CanopyUI.graphic(starPath,'watchlist-star')+(labelled?`<span>${pinned?'Remove from watchlist':'Add to watchlist'}</span>`:'');
}
function watchToggle(asset,labelled=false){
  const active=watchlist.includes(asset.symbol);
  return `<button type="button" class="${labelled?'secondary watch-action':'pin'}" data-pin="${asset.symbol}" aria-label="Watch ${asset.name}" aria-pressed="${active}" title="${active?'Remove from':'Add to'} watchlist">${pinContents(active,labelled)}</button>`;
}
const tvSymbols={ZRO:'COINBASE:ZROUSD',BTC:'COINBASE:BTCUSD',ETH:'COINBASE:ETHUSD',SOL:'COINBASE:SOLUSD',USDC:'COINBASE:USDCUSD',NVDA:'NASDAQ:NVDA',TSLA:'NASDAQ:TSLA',AAPL:'NASDAQ:AAPL',DOGE:'BINANCE:DOGEUSDT',PEPE:'BINANCE:PEPEUSDT',WIF:'BINANCE:WIFUSDT',BONK:'BINANCE:BONKUSDT'};
Object.assign(tvSymbols,{"XRP": "BINANCE:XRPUSDT", "ADA": "BINANCE:ADAUSDT", "AVAX": "BINANCE:AVAXUSDT", "LINK": "BINANCE:LINKUSDT", "DOT": "BINANCE:DOTUSDT", "LTC": "BINANCE:LTCUSDT", "BCH": "BINANCE:BCHUSDT", "UNI": "BINANCE:UNIUSDT", "AAVE": "BINANCE:AAVEUSDT", "NEAR": "BINANCE:NEARUSDT", "SUI": "BINANCE:SUIUSDT", "ARB": "BINANCE:ARBUSDT", "OP": "BINANCE:OPUSDT", "MSFT": "NASDAQ:MSFT", "AMZN": "NASDAQ:AMZN", "GOOGL": "NASDAQ:GOOGL", "META": "NASDAQ:META", "NFLX": "NASDAQ:NFLX", "AMD": "NASDAQ:AMD", "INTC": "NASDAQ:INTC", "COIN": "NASDAQ:COIN", "PLTR": "NASDAQ:PLTR", "MSTR": "NASDAQ:MSTR", "JPM": "NYSE:JPM", "V": "NYSE:V", "DIS": "NYSE:DIS", "WMT": "NASDAQ:WMT", "UBER": "NYSE:UBER", "SPY": "AMEX:SPY"});
for(const benchmark of marketBenchmarks)tvSymbols[benchmark.symbol]=benchmark.market;
function liveChart(symbol, id, market = tvSymbols[symbol]) {
  if (!market) {
    return `<div class="chart-unavailable" role="status"><strong>Chart unavailable</strong><p>No exchange chart is available for ${symbol}.</p></div>`;
  }
  return `<div class="live-chart" id="${id}" data-tv="${market}" data-chart-title="${symbol}"></div>
    <div class="chart-source"><a href="https://www.tradingview.com/chart/?symbol=${encodeURIComponent(market)}" target="_blank" rel="noopener">Open on TradingView</a><span>Exchange data · Separate from demo quotes</span></div>`;
}

const mobileSwapLayout=window.matchMedia?.('(max-width: 720px)');

function hydrateCharts() {
  document.querySelectorAll('[data-tv]:not([data-loaded])').forEach(el => {
    if (el.closest('details:not([open])') || (mobileSwapLayout?.matches && el.closest('#swap-chart-panel'))) return;
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
mobileSwapLayout?.addEventListener?.('change', event=>{
  if(!event.matches){hydrateCharts();return;}
  $('#swap-chart-panel')?.querySelectorAll('[data-tv][data-loaded]').forEach(chart=>{
    chart.replaceChildren();
    delete chart.dataset.loaded;
  });
});

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
      <section class="watchlist"><div class="card-top"><h2>Watchlist</h2><button class="quiet" data-go="markets" data-mini="watchlist">View all</button></div>
        ${pinnedAssets().slice(0,5).map(asset=>`<button class="watch-row" data-asset="${asset.symbol}">${coin(asset)}<span>${asset.symbol}<small>${asset.name}</small></span><span class="watch-price">${money(asset.price)}</span></button>`).join('')||'<p class="form-note">Star an asset in Markets to follow it here.</p>'}<span class="data-caption">Sample prices</span>
      </section>
    </aside>
  </div>
  <section class="holdings">
    <div class="card-top"><div class="section-tabs"><button data-hold="assets" class="${holdTab==='assets'?'active':''}">Holdings <span class="count">${held.length}</span></button><button data-hold="activity" class="${holdTab==='activity'?'active':''}">Recent activity</button></div><span class="data-caption">Sample balances</span></div>
    ${holdTab==='activity'?activityRows():`<table><thead><tr><th>Asset</th><th class="price-col">Sample price</th><th>Balance</th></tr></thead><tbody>${held.map(asset=>`<tr data-asset="${asset.symbol}"><td><button class="quiet asset-button" aria-label="View ${asset.name} (${asset.symbol})" data-asset="${asset.symbol}">${assetName(asset)}</button></td><td class="price-col">${money(asset.price)}</td><td>${money(asset.price*state.balances[asset.symbol])}<small>${num(state.balances[asset.symbol])} ${asset.symbol}</small></td></tr>`).join('')}</tbody></table>`}
    ${holdTab==='assets'?'<p class="form-note">ZRO is native to Zero. The other holdings are LayerZero ecosystem examples with simulated balances.</p>':''}
  </section>`;
}

let tradeMode = 'swap';
const bridgeTokens = ['ZRO'];
const bridgeNetworks = ['Ethereum', 'Zero (demo)'];
const slippagePresets = [0.1, 0.5, 1];
const tradeFeePercent = {swap: 0.3, bridge: 0.1};
const tradeDrafts = {
  swap: {from: 'ZRO', to: 'USDT0', amount: '1', chartOpen: true, slippage: '0.5', recipientMode: 'own', recipient: ''},
  bridge: {from: 'ZRO', to: 'ZRO', amount: '100', source: 'Ethereum', destination: 'Zero (demo)', recipientMode: 'own', recipient: ''}
};
const amountText = amount => amount.toLocaleString('en-US', {maximumFractionDigits: 7});
const isWalletAddress = address => /^0x[0-9a-f]{40}$/i.test(address) && !/^0x0{40}$/i.test(address);

const tradeSettingsIcon = '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.08A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.08A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.08A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.08A1.65 1.65 0 0 0 19.4 15Z"/>';

function tradeSlippageMenu() {
  return `<details class="trade-slippage-menu" id="trade-slippage-menu">
    <summary aria-label="Swap settings" title="Swap settings">${CanopyUI.graphic(tradeSettingsIcon)}</summary>
    <div class="trade-slippage-panel">
      <label for="trade-slippage">Slippage tolerance</label>
      <div class="slippage-controls">
        <div class="amount-shortcuts" role="group" aria-label="Slippage presets">${slippagePresets.map(percent => `<button type="button" data-slippage-percent="${percent}" aria-pressed="false">${percent}%</button>`).join('')}</div>
        <div class="slippage-input"><input id="trade-slippage" type="number" min="0.01" max="5" step="any" inputmode="decimal" aria-label="Slippage tolerance (%)" aria-describedby="trade-slippage-note"><span aria-hidden="true">%</span></div>
      </div>
      <small class="trade-setting-error" id="trade-slippage-note" hidden></small>
    </div>
  </details>`;
}

function tradeRecipient() {
  return `<div class="trade-recipient">
    <div class="trade-recipient-row">
      <label for="trade-recipient-mode">Recipient</label>
      <select id="trade-recipient-mode" class="trade-recipient-picker"><option value="own">My wallet</option><option value="external">Another wallet</option></select>
    </div>
    <div class="trade-recipient-address" id="trade-recipient-address" hidden>
      <label for="trade-recipient">Destination wallet address</label>
      <input id="trade-recipient" class="modal-input" type="text" placeholder="0x…" spellcheck="false" autocomplete="off" autocapitalize="off" maxlength="96" aria-describedby="trade-recipient-note">
      <small class="trade-setting-error" id="trade-recipient-note" hidden></small>
    </div>
  </div>`;
}

document.addEventListener('click', event => {
  const menu = $('#trade-slippage-menu');
  if (menu?.open && !menu.contains(event.target)) menu.open = false;
});
document.addEventListener('keydown', event => {
  const menu = $('#trade-slippage-menu');
  if (event.key !== 'Escape' || !menu?.open || appDialog.open) return;
  event.preventDefault();
  menu.open = false;
  menu.querySelector('summary').focus();
});

function tradeOptions(items, selected) {
  return items.map(item => `<option ${item === selected ? 'selected' : ''}>${item}</option>`).join('');
}

function amountShortcuts(id) {
  return `<div class="amount-shortcuts" id="${id}" role="group" aria-label="Percentage of available balance">${[25, 50, 75, 100].map(percent=>`<button type="button" data-amount-percent="${percent}" aria-pressed="false">${percent===100?'Max':`${percent}%`}</button>`).join('')}</div>`;
}

function mountAmountShortcuts(group, input, getBalance, onChange) {
  const buttons = group.querySelectorAll('[data-amount-percent]');
  const choice = button => {
    const balance = getBalance() ?? 0;
    const percent = Number(button.dataset.amountPercent);
    // Preserve the exact stored balance for Max and avoid floating-point tails for fractions.
    return percent === 100 ? balance : Number((balance * (percent / 100)).toPrecision(15));
  };
  const refresh = () => {
    for (const button of buttons) {
      const amount = choice(button);
      button.disabled = !(amount > 0);
      button.setAttribute('aria-pressed', String(!button.disabled && Number(input.value) === amount));
    }
  };
  for (const button of buttons) {
    button.onclick = () => {
      const amount = choice(button);
      if (!(amount > 0)) return;
      input.value = String(amount);
      onChange?.();
      refresh();
    };
  }
  input.addEventListener('input', refresh);
  refresh();
  return refresh;
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
        <div class="trade-card-header">
          <div class="trade-tabs" role="group" aria-label="Trade mode">
            <a href="#swap" ${bridge ? '' : 'class="active" aria-current="page"'}>Swap</a>
            <a href="#swap/bridge" ${bridge ? 'class="active" aria-current="page"' : ''}>Bridge</a>
          </div>
          ${bridge ? '' : tradeSlippageMenu()}
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
          <div class="field-bottom"><span id="pay-usd"></span>${amountShortcuts('trade-amount-shortcuts')}</div>
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
          <div class="field-bottom"><span id="receive-usd"></span><span>Includes demo fee</span></div>
        </div>
        ${tradeRecipient()}
        <div class="trade-details">
          <div><span>${bridge ? 'Demo arrival' : 'Sample exchange rate'}</span><b id="rate">${demoActivityDuration.Bridge/1000} seconds</b></div>
          ${bridge ? '' : '<div><span>Minimum received</span><b id="minimum-received">—</b></div>'}
          <div><span>${bridge ? 'Bridge fee' : 'Trading fee'}</span><b>${tradeFeePercent[action]}%</b></div>
          <div><span>Network fee</span><b>Illustrative · $0.08</b></div>
        </div>
        <button class="primary full" id="review-trade">Review demo ${action}</button>
        ${bridge ? '<p class="form-note">Simulated transfer. No ZRO moves.</p>' : ''}
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
  $('#trade-recipient-mode').value = draft.recipientMode;
  $('#trade-recipient-mode').onchange = updateQuote;
  $('#trade-recipient').value = draft.recipient;
  $('#trade-recipient').addEventListener('input', updateQuote);
  if (!bridge) {
    const slippage = $('#trade-slippage');
    slippage.value = draft.slippage;
    slippage.addEventListener('input', updateQuote);
    for (const preset of document.querySelectorAll('[data-slippage-percent]')) {
      preset.onclick = () => { slippage.value = preset.dataset.slippagePercent; updateQuote(); };
    }
  }
  const refreshShortcuts = mountAmountShortcuts($('#trade-amount-shortcuts'), amount, () => state.balances[from.value], updateQuote);

  // Keep the two tokens distinct when either picker selects the token on the other side.
  from.onchange = () => {
    if (!bridge && from.value === to.value) to.value = draft.from;
    updateQuote();
    refreshShortcuts();
  };
  to.onchange = () => {
    if (!bridge && from.value === to.value) from.value = draft.to;
    updateQuote();
    refreshShortcuts();
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
  $('#reverse').onclick = () => {
    if (bridge) {
      [source.value, destination.value] = [destination.value, source.value];
    } else {
      [from.value, to.value] = [to.value, from.value];
    }
    updateQuote();
    refreshShortcuts();
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
function marketOverviewWatchlist(){
  const saved=pinnedAssets();
  if(!saved.length)return '<p class="market-overview-empty">Star a market to save it here.</p>';
  const rows=saved.slice(0,4).map(asset=>`<div class="market-overview-watch-row"><button type="button" class="market-overview-asset" data-select-market="${asset.symbol}">${coin(asset)}<span><strong>${asset.symbol}</strong><small>${asset.name}</small></span></button>${watchToggle(asset)}</div>`);
  return `<div class="market-overview-watch-rows">${rows.join('')}</div>${saved.length>4?`<button type="button" class="quiet market-overview-more" data-market-view="watchlist">View all ${saved.length}</button>`:''}`;
}

function marketMovers(){
  const withMoves=assets.filter(asset=>Number.isFinite(asset.change));
  const gainers=withMoves.filter(asset=>asset.change>0).sort((a,b)=>b.change-a.change);
  const decliners=withMoves.filter(asset=>asset.change<0).sort((a,b)=>a.change-b.change);
  function group(title,items){
    return `<div class="market-mover-group"><h3>${title}</h3>${items.slice(0,2).map(asset=>`<button type="button" class="market-overview-asset market-mover-row" data-select-market="${asset.symbol}">${coin(asset)}<strong>${asset.symbol}</strong>${chg(asset)}</button>`).join('')||'<p class="market-overview-empty">No sample moves.</p>'}</div>`;
  }
  return `<div class="market-mover-groups">${group('Gainers',gainers)}${group('Decliners',decliners)}</div>`;
}

function marketOverview(){
  return `<div class="market-overview">
    <section class="market-benchmarks" aria-labelledby="market-benchmark-title">
      <div class="market-overview-head"><h2 id="market-benchmark-title">Benchmarks</h2><button type="button" class="quiet market-overview-more" data-market-view="indices">View indices</button></div>
      <div class="market-benchmark-rail">${marketBenchmarks.map(benchmark=>`<button type="button" class="card market-benchmark" data-select-market="${benchmark.symbol}" aria-label="Open ${benchmark.name} chart"><span class="market-benchmark-top"><span class="market-benchmark-mark">${CanopyUI.graphic(benchmark.mark)}</span><span class="market-benchmark-symbol">${benchmark.symbol}</span></span><strong>${benchmark.name}</strong><small>${benchmark.context}</small></button>`).join('')}</div>
    </section>
    <div class="market-overview-panels">
      <section class="card market-overview-card" aria-labelledby="market-movers-title"><div class="market-overview-head"><h2 id="market-movers-title">Top movers</h2><span class="data-caption">Sample changes</span></div>${marketMovers()}</section>
      <section class="card market-overview-card" aria-labelledby="market-overview-radar-title"><div class="market-overview-head"><h2 id="market-overview-radar-title">On your radar</h2><span class="data-caption">Watchlist</span></div><div id="market-overview-watchlist">${marketOverviewWatchlist()}</div></section>
    </div>
  </div>`;
}

const marketCategories=[['all','All'],['crypto','Crypto'],['stocks','Stocks'],['indices','Indices'],['memes','Memes']];
const marketSortOptions=[['featured','Featured'],['gainers','Top gainers'],['losers','Top losers'],['price','Highest price'],['name','Name A–Z']];
const marketPageSize=12;
let pendingMarketView='';
const marketDirectory={category:'all',watchlist:false,sort:'featured',query:'',limit:marketPageSize};
const marketSearchIcon='<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>';
const marketArrowIcon='<path d="m10 7 5 5-5 5"/>';

function marketCategory(asset){
  if(asset.type==='indices'||asset.type==='index')return 'indices';
  return asset.type;
}

function marketMatches(){
  const search=marketDirectory.query.trim().toLowerCase();
  const result=assets.filter(asset=>
    (marketDirectory.category==='all'||marketCategory(asset)===marketDirectory.category)&&
    (!marketDirectory.watchlist||watchlist.includes(asset.symbol))&&
    (!search||`${asset.symbol} ${asset.name}`.toLowerCase().includes(search))
  );
  const {sort}=marketDirectory;
  if(sort==='name')return result.sort((left,right)=>left.name.localeCompare(right.name));
  if(sort==='featured')return result;
  const metric=sort==='price'?'price':'change';
  return result.sort((left,right)=>{
    const a=left[metric],b=right[metric];
    if(!Number.isFinite(a))return Number.isFinite(b)?1:0;
    if(!Number.isFinite(b))return -1;
    return sort==='losers'?a-b:b-a;
  });
}

function marketIndexRows(visible){
  return visible.map(asset=>{
    const category=marketCategories.find(([key])=>key===marketCategory(asset))?.[1]||'Market';
    const price=Number.isFinite(asset.price)?money(asset.price,asset.price<.01?7:2):'—';
    const change=Number.isFinite(asset.change)?chg(asset):'<span class="muted market-index-empty-value" aria-label="No sample change">—</span>';
    const action=tvSymbols[asset.symbol]?'Open chart':'View details';
    return `<tr data-market-row="${asset.symbol}">
      <td class="market-index-pin">${watchToggle(asset)}</td>
      <th scope="row"><button type="button" class="market-index-asset" data-select-market="${asset.symbol}" aria-label="${action}: ${asset.name}">${assetName(asset)}</button></th>
      <td class="market-index-kind"><span>${category}</span></td>
      <td class="market-index-price"><span>${price}</span><span class="market-index-mobile-change">${change}</span></td>
      <td class="market-index-change">${change}</td>
      <td class="market-index-open" aria-hidden="true">${CanopyUI.graphic(marketArrowIcon)}</td>
    </tr>`;
  }).join('');
}

function marketIndexResults(results){
  if(!results.length){
    const savedEmpty=marketDirectory.watchlist&&!watchlist.length;
    return `<div class="market-index-empty">${CanopyUI.graphic(savedEmpty?starPath:marketSearchIcon)}<strong>${savedEmpty?'Your watchlist is empty':'No markets match these filters'}</strong><p>${savedEmpty?'Star an asset in the market index to save it here.':'Try another search or clear the filters.'}</p><button class="secondary" type="button" data-market-clear>${savedEmpty?'Browse markets':'Clear filters'}</button></div>`;
  }
  const visible=results.slice(0,marketDirectory.limit);
  return `<table class="market-index-table" aria-labelledby="market-index-title">
    <colgroup><col class="mi-col-pin"><col><col class="mi-col-kind"><col class="mi-col-price"><col class="mi-col-change"><col class="mi-col-open"></colgroup>
    <thead><tr><th scope="col"><span class="market-sr-only">Watchlist</span></th><th scope="col">Asset</th><th scope="col" class="market-index-kind">Category</th><th scope="col" class="market-index-price">Sample price<span class="market-index-mobile-change"> / 24h</span></th><th scope="col" class="market-index-change">24h sample</th><th scope="col" class="market-index-open"><span class="market-sr-only">Details</span></th></tr></thead>
    <tbody>${marketIndexRows(visible)}</tbody>
  </table>
  <div class="market-index-footer"><span>Showing ${visible.length} of ${results.length}</span>${results.length>visible.length?'<button class="secondary" type="button" data-market-more>Show more</button>':''}</div>`;
}

function markets(){
  const results=marketMatches();
  return `<div class="markets-workspace">
    <div class="market-page-heading"><div><h1>Markets</h1><p>Benchmarks, movers and your watchlist in one view.</p></div><span class="market-chart-source">${CanopyUI.graphic('<path d="M3 17l5-5 4 3 8-9"/>')} Charts by TradingView</span></div>
    ${marketOverview()}
    <section class="card market-directory" id="market-directory" aria-labelledby="market-index-title">
      <div class="market-directory-heading"><div><h2 id="market-index-title">Market index</h2><span id="market-index-count" role="status">${results.length} ${results.length===1?'market':'markets'}</span></div><button class="market-watch-filter" type="button" id="market-watch-filter" data-market-watchlist aria-pressed="${marketDirectory.watchlist}">${CanopyUI.graphic(starPath,'watchlist-star')}<span>Watchlist</span></button></div>
      <div class="market-directory-toolbar">
        <div class="market-category-buttons" role="group" aria-label="Market category">${marketCategories.map(([key,label])=>`<button type="button" data-market-category="${key}" aria-pressed="${marketDirectory.category===key}">${label}</button>`).join('')}</div>
        <div class="market-directory-fields"><label class="market-search-label" for="search">${CanopyUI.graphic(marketSearchIcon)}<span class="market-sr-only">Search markets</span><input type="search" id="search" placeholder="Search markets" autocomplete="off"></label><label class="market-sort-label" for="market-sort"><span class="market-sr-only">Sort markets</span><select id="market-sort">${marketSortOptions.map(([key,label])=>`<option value="${key}">${label}</option>`).join('')}</select></label></div>
      </div>
      <div id="market-index-results">${marketIndexResults(results)}</div>
    </section>
  </div>`;
}

function refreshMarketIndex(){
  const index=$('#market-index-results');
  if(!index || page!=='markets')return;
  const results=marketMatches();
  index.innerHTML=marketIndexResults(results);
  $('#market-index-count').textContent=`${results.length} ${results.length===1?'market':'markets'}`;
  for(const button of document.querySelectorAll('[data-market-category]'))button.setAttribute('aria-pressed',String(button.dataset.marketCategory===marketDirectory.category));
  $('#market-watch-filter').setAttribute('aria-pressed',String(marketDirectory.watchlist));
}

function showMarketView(view){
  marketDirectory.watchlist=view==='watchlist';
  marketDirectory.category=view==='indices'?'indices':'all';
  marketDirectory.query='';
  marketDirectory.limit=marketPageSize;
  if(page!=='markets'){
    if(view==='watchlist')pendingMarketView=view;
    return;
  }
  $('#search').value='';
  refreshMarketIndex();
  focusMarketIndex(view);
}

function focusMarketIndex(view){
  $('#market-directory').scrollIntoView({block:'start'});
  const control=view==='indices'?'[data-market-category="indices"]':view==='watchlist'?'#market-watch-filter':'#search';
  $(control)?.focus({preventScroll:true});
}

function mountMarketDirectory(){
  const search=$('#search'),sort=$('#market-sort');
  search.value=marketDirectory.query;
  sort.value=marketDirectory.sort;
  search.oninput=()=>{
    marketDirectory.query=search.value;
    marketDirectory.limit=marketPageSize;
    refreshMarketIndex();
  };
  sort.onchange=()=>{
    marketDirectory.sort=sort.value;
    marketDirectory.limit=marketPageSize;
    refreshMarketIndex();
  };
}

function stake(){
  const zro=zeroDemoAssets[0];
  return heading('Stake','Try delegating sample ZRO in Demo Mode.')+`
  <div class="staking-hero"><section class="card staking-total"><div class="label">Your staked balance</div><div class="big-number">${num(state.staked)} ZRO</div><div class="stat-row zero-stats"><div><span class="label">Demo rewards</span><div class="value">${num(state.rewards)} ZRO</div></div><div><button class="secondary" data-action="claim" ${state.rewards<=0?'disabled':''}>Claim demo rewards</button></div></div></section>
  <section class="card staking-card">${assetName(zro)}<h2>Delegate ZRO</h2><p>Available in demo: ${num(state.balances.ZRO)} ZRO</p><button class="secondary" data-stake="ZRO" ${state.balances.ZRO<=0?'disabled':''}>Stake demo ZRO</button></section></div>`;
}
const activityText=value=>String(value??'').replace(/[&<>"']/g,character=>({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;',
}[character]));

function activityIcons(entry){
  // Earlier demo entries have text only. Recover known symbols from their amounts.
  const symbols=Array.isArray(entry.symbols) ? entry.symbols :
    Array.from(String(entry.detail ?? '').matchAll(/(?:^|\s)\$?\d[\d,.]*\s+([A-Za-z][A-Za-z0-9]*)\b/g),match=>match[1]);
  const tokens=[...new Set(symbols)].filter(symbol=>assets.some(asset=>asset.symbol===symbol)).slice(0,2);
  const fallback=entry.type==='Bridge' ? '<path d="M3 5v14M21 5v14M3 8c4 8 14 8 18 0M3 17h18"/>' : entry.type==='Swap' ? icons.swap : icons.stake;
  return `<span class="activity-asset-icons ${tokens.length===2?'activity-asset-pair':''}" aria-hidden="true">${tokens.length?tokens.map(symbol=>CanopyUI.token(symbol)).join(''):CanopyUI.graphic(fallback)}</span>`;
}

const demoActivityDuration = { Swap: 8000, Bridge: 20000 };
let activityTimer;

function activityStatus(entry, now = Date.now()) {
  const receipt = entry.receipt;
  const deadline = receipt?.endsAt;
  const timed = Number.isFinite(deadline);
  const remaining = timed && !receipt.settled ? Math.max(0, Math.ceil((deadline - now) / 1000)) : 0;
  const phase = remaining === 0 ? 'complete' : entry.type === 'Bridge' && now < receipt.sourceAt ? 'source' : 'delivery';
  return {remaining, phase, label: phase === 'complete' ? 'Complete' : phase === 'source' ? 'Source pending' : entry.type === 'Bridge' ? 'In transit' : 'Processing'};
}

function activityEntries(kind='', phase='', now=Date.now()){
  const entries=[];
  for(let index=state.activity.length-1; index>=0; index--){
    const entry=state.activity[index];
    if(!entry||(kind&&entry.type!==kind))continue;
    const status=activityStatus(entry,now);
    if(phase&&(status.phase==='complete'?'complete':'pending')!==phase)continue;
    entries.push({entry,index,status});
  }
  return entries;
}

function activityRows(kind){
  return renderActivityRows(activityEntries(kind),kind);
}

function renderActivityRows(entries,kind,filtered=false){
  if(!entries.length){
    if(filtered)return `<div class="empty">${CanopyUI.graphic(icons.activity)}<div>No matching activity.<small>Choose a different type or status.</small></div></div>`;
    const details={Bridge:'Simulated transfers will appear here.',Swap:'Simulated swaps will appear here.',Claim:'Your simulated ZRO claims will appear here.'};
    return `<div class="empty">${CanopyUI.graphic(icons.activity)}<div>${kind==='Claim'?'No claims yet.':'No moves yet.'}<small>${details[kind]||'Your demo swaps, bridges, and staking activity will appear here.'}</small></div></div>`;
  }
  return entries.map(({entry,index,status})=>`<button type="button" class="activity-row activity-link" data-activity-index="${index}" aria-haspopup="dialog">
      ${activityIcons(entry)}
      <span class="activity-copy">${activityText(entry.type)}<small>${activityText(entry.detail)}</small></span>
      <span class="activity-status" data-activity-status="${index}" data-phase="${status.phase}"><span>${status.label}</span><small>${activityText(entry.time)}</small></span>
      ${CanopyUI.graphic('<path d="m10 7 5 5-5 5"/>','activity-chevron')}
    </button>`).join('');
}

function activityTimeline(entry, status) {
  const {receipt} = entry;
  const sourceNetwork = receipt?.source || 'Source network';
  const destinationNetwork = receipt?.destination || 'Destination network';
  const stages = entry.type==='Bridge'
    ? [ ['Submitted','Demo transfer created','done'], ['Source confirmation',sourceNetwork,status.phase==='source'?'current':'done'], ['Destination arrival',destinationNetwork,status.phase==='complete'?'done':status.phase==='delivery'?'current':'waiting'] ]
    : [ ['Submitted','Demo activity recorded','done'], ['Completed',entry.type==='Swap'?(receipt?.recipient?'Simulated delivery to recipient':'Sample balances updated'):'Local demo balance updated',status.phase==='complete'?'done':'current'] ];
  return stages.map(([title,detail,state])=>`<li data-stage="${state}" ${state==='current'?'aria-current="step"':''}><span class="activity-node">${state==='done'?CanopyUI.graphic('<path d="m5 12 4 4L19 6"/>'):''}</span><span><strong>${title}</strong><small>${activityText(detail)}</small></span></li>`).join('');
}

function activityCountdown(seconds) {
  return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
}

function createDemoHash() {
  const bytes=crypto.getRandomValues(new Uint8Array(32));
  return `0x${Array.from(bytes,byte=>byte.toString(16).padStart(2,'0')).join('')}`;
}

const receiptAmount=new Intl.NumberFormat('en-US',{maximumFractionDigits:12});
function tradeReceiptDetails(receipt) {
  if(!receipt || !Number.isFinite(receipt.amount) || !Number.isFinite(receipt.received) ||
     !demoSwapTokens.includes(receipt.from) || !demoSwapTokens.includes(receipt.to)) return '';
  const value=(amount,symbol)=>`${receiptAmount.format(amount)} ${symbol}`;
  return `<dl class="activity-receipt-values">
    <div><dt>Amount sent</dt><dd>${value(receipt.amount,receipt.from)}</dd></div>
    <div><dt>Demo output</dt><dd>${value(receipt.received,receipt.to)}</dd></div>
    ${Number.isFinite(receipt.minimumReceived)&&Number.isFinite(receipt.slippagePercent)?`<div><dt>Minimum received</dt><dd>${value(receipt.minimumReceived,receipt.to)}</dd></div><div><dt>Slippage tolerance</dt><dd>${receiptAmount.format(receipt.slippagePercent)}%</dd></div>`:''}
    ${Number.isFinite(receipt.feePercent)?`<div><dt>Demo fee</dt><dd>${receiptAmount.format(receipt.feePercent)}%</dd></div>`:''}
    <div><dt>Recipient</dt><dd ${receipt.recipient?'class="receipt-address"':''}>${receipt.recipient?activityText(receipt.recipient):'Your demo wallet'}</dd></div>
  </dl>`;
}

function openActivityDetails(index) {
  const entry=state.activity[index];
  if(!entry)return;
  if(!/^0x[0-9a-f]{64}$/.test(entry.demoHash||'')){
    entry.demoHash=createDemoHash();
    try { persist(); } catch {}
  }
  const status=activityStatus(entry);
  const title={Bridge:'Transfer status',Swap:'Swap status',Stake:'Stake status',Claim:'Claim status'}[entry.type]||'Activity details';
  const receipt=entry.receipt;
  const details=tradeReceiptDetails(receipt);
  const description=details?(entry.type==='Bridge'?`${receipt.source} to ${receipt.destination}`:''):entry.detail;
  showModal(`<div class="activity-tracker" id="activity-tracker" data-activity-index="${index}" data-phase="${status.phase}">
    <div class="activity-tracker-header"><span class="tag">Demo Mode</span>${CanopyUI.graphic('<path d="M5 19C5 10 11 5 20 4c0 9-5 15-14 15m0 0L16 9M10 15h5"/>','activity-leaf')}</div>
    <div class="activity-tracker-title">${activityIcons(entry)}<h2>${title}</h2></div>
    ${description?`<p class="activity-description">${activityText(description)}</p>`:''}
    <div class="activity-tracker-state"><div><span class="data-caption">Status</span><strong data-status-label role="status">${status.label}</strong></div><div data-activity-eta ${status.remaining?'':'hidden'}><span class="data-caption">Demo time remaining</span><strong data-activity-countdown role="timer">${activityCountdown(status.remaining)}</strong></div></div>
    <ol class="activity-timeline" aria-label="Demo transaction stages">${activityTimeline(entry,status)}</ol>
    ${details}
    <div class="demo-hash"><label class="data-caption" for="demo-hash-value">Demo transaction hash</label><div class="demo-hash-controls"><input id="demo-hash-value" readonly spellcheck="false" value="${entry.demoHash}" dir="ltr"><button type="button" class="secondary" id="copy-demo-hash" aria-label="Copy demo transaction hash">Copy</button></div><span class="data-caption" id="demo-hash-feedback" role="status" hidden></span></div>
    <p class="form-note">${entry.type==='Bridge'?'Simulated route. No assets move and destination balances do not change.':receipt?.recipient?'Delivery is simulated. The recipient receives no real assets.':'This activity uses your sample balances. No onchain transaction was sent.'}</p>
  </div>`);
  const copy=$('#copy-demo-hash');
  const input=$('#demo-hash-value');
  const feedback=$('#demo-hash-feedback');
  copy.onclick=async()=>{
    try{
      await navigator.clipboard.writeText(entry.demoHash);
      feedback.textContent='Demo hash copied.';
    }catch{
      input.focus({preventScroll:true});
      input.select();
      feedback.textContent='Hash selected. Use your device’s copy action.';
    }
    feedback.hidden=false;
  };
  scheduleActivityTick();
}

function settleDueActivity(now = Date.now()) {
  const due = entry=>Number.isFinite(entry?.receipt?.endsAt) && !entry.receipt.settled && entry.receipt.endsAt <= now;
  if(!state.activity.some(due))return false;
  // Reconcile the saved receipt first: another tab may already have completed it.
  let latest;
  try { latest=JSON.parse(localStorage.getItem(demoStateKey)); } catch {}
  let changed=false;
  if(latest===null){
    state.activity=[];
    state.balances=Object.fromEntries(zeroDemoAssets.map(asset=>[asset.symbol,asset.balance]));
    state.staked=240;
    state.rewards=12;
    return true;
  }
  if(latest?.version===state.version && Array.isArray(latest.activity)){
    const previousBalances=state.balances;
    state.activity=latest.activity;
    state.balances=Object.fromEntries(demoSwapTokens.map(symbol=>[symbol,nonnegative(latest.balances?.[symbol],previousBalances[symbol])]));
    state.staked=nonnegative(latest.staked,state.staked);
    state.rewards=nonnegative(latest.rewards,state.rewards);
    changed=demoSwapTokens.some(symbol=>state.balances[symbol]!==previousBalances[symbol]);
  }
  let settled=false;
  for(const entry of state.activity.filter(due)){
    const {receipt}=entry;
    if(entry.type==='Swap' && !receipt.recipient && demoSwapTokens.includes(receipt.to) && Number.isFinite(receipt.received) && receipt.received > 0){
      state.balances[receipt.to]+=receipt.received;
      changed=true;
    }
    receipt.settled=true;
    settled=true;
  }
  // A storage error should not leave the current page or tracker frozen.
  if(settled){try { persist(); } catch {}}
  return changed;
}

function scheduleActivityTick() {
  clearTimeout(activityTimer);
  const now = Date.now();
  if (!document.hidden && state.activity.some(entry=>!entry?.receipt?.settled && Number.isFinite(entry?.receipt?.endsAt))) {
    activityTimer=setTimeout(refreshActivityStatus, Math.max(100, 1000 - now % 1000));
  }
}

function refreshActivityStatus() {
  const now=Date.now();
  if(settleDueActivity(now)){
    if(page==='swap') $('#amount').dispatchEvent(new Event('input'));
    if(page==='portfolio' || page==='stake') render(true);
  }
  if(page==='activity') refreshFilteredActivity(now);
  for(const indicator of document.querySelectorAll('[data-activity-status]')){
    const entry=state.activity[Number(indicator.dataset.activityStatus)];
    if(!entry)continue;
    const status=activityStatus(entry,now);
    if(indicator.dataset.phase===status.phase)continue;
    indicator.dataset.phase=status.phase;
    indicator.firstElementChild.textContent=status.label;
  }
  const tracker=appDialog.open ? $('#activity-tracker') : null;
  const entry=tracker && state.activity[Number(tracker.dataset.activityIndex)];
  if(entry){
    const status=activityStatus(entry,now);
    tracker.querySelector('[data-activity-eta]').hidden=!status.remaining;
    tracker.querySelector('[data-activity-countdown]').textContent=activityCountdown(status.remaining);
    if(tracker.dataset.phase!==status.phase){
      tracker.dataset.phase=status.phase;
      tracker.querySelector('[data-status-label]').textContent=status.label;
      tracker.querySelector('.activity-timeline').innerHTML=activityTimeline(entry,status);
    }
  }
  scheduleActivityTick();
}

document.addEventListener('visibilitychange',()=>{
  if(document.hidden)clearTimeout(activityTimer);
  else refreshActivityStatus();
});
const activityFilterOptions={
  type:[['','All types'],['Swap','Swaps'],['Bridge','Transfers'],['Stake','Staking'],['Claim','Claims']],
  status:[['','All statuses'],['pending','Pending'],['complete','Complete']],
};
const activityFilterKey='canopy-zero-activity-filters';
const activityFilters={type:'',status:''};
try {
  const saved=JSON.parse(sessionStorage.getItem(activityFilterKey));
  for(const name of Object.keys(activityFilters)){
    if(activityFilterOptions[name].some(([value])=>value===saved?.[name]))activityFilters[name]=saved[name];
  }
} catch {}

function activityFilterSelect(name,label){
  const options=activityFilterOptions[name].map(([value,text])=>`<option value="${value}" ${activityFilters[name]===value?'selected':''}>${text}</option>`).join('');
  return `<label class="activity-filter"><span>${label}</span><select id="activity-filter-${name}" data-activity-filter="${name}">${options}</select></label>`;
}

function filteredActivity(now){
  const {type,status}=activityFilters;
  const entries=activityEntries(type,status,now);
  const key=JSON.stringify([type,status,...entries.map(({entry,index})=>[index,entry.type,entry.time,entry.detail])]);
  return {entries,key,filtered:Boolean(type||status)};
}

function refreshFilteredActivity(now=Date.now()){
  const results=$('#activity-results');
  if(!results)return;
  const {entries,key,filtered}=filteredActivity(now);
  if(results.dataset.view===key)return;
  const focused=document.activeElement;
  const focusedIndex=focused&&results.contains(focused) ? focused.dataset.activityIndex : null;
  results.dataset.view=key;
  results.innerHTML=renderActivityRows(entries,activityFilters.type,filtered);
  if(focusedIndex!=null){
    (results.querySelector(`[data-activity-index="${Number(focusedIndex)}"]`)||$('#activity-filter-status')).focus({preventScroll:true});
  }
}

function activity(){
  const {entries,key,filtered}=filteredActivity();
  return heading('Activity','Review your demo transactions.')+`<section class="card activity-card">
    <div class="activity-filters" role="group" aria-label="Filter activity">${activityFilterSelect('type','Type')}${activityFilterSelect('status','Status')}</div>
    <div id="activity-results" data-view="${activityText(key)}">${renderActivityRows(entries,activityFilters.type,filtered)}</div>
  </section>`;
}

document.addEventListener('change',event=>{
  const target=event.target;
  const name=target?.dataset?.activityFilter;
  if(!Object.hasOwn(activityFilterOptions,name)||!activityFilterOptions[name].some(([value])=>value===target.value))return;
  activityFilters[name]=target.value;
  try { sessionStorage.setItem(activityFilterKey,JSON.stringify(activityFilters)); } catch {}
  refreshFilteredActivity();
});
function comingSoon(){
  return heading('Perps','Perpetual markets on Zero.')+`<section class="card zero-roadmap"><div class="zero-roadmap-mark">${navIcon('perps')}</div><span class="tag">Coming soon</span><h2>A place for your positions.</h2><p>Explore perpetual markets and manage positions here once a Zero venue is integrated.</p><a class="secondary" href="#markets">Explore markets</a></section>`;
}
function rewards(){
  const claimable=state.rewards>0;
  const alreadyClaimed=state.activity.some(entry=>entry?.type==='Claim');
  return heading('Rewards','Staking rewards and Canopy Points.')+`
    <section class="card rewards-points" aria-labelledby="rewards-points-title">
      <span class="rewards-points-mark">${CanopyUI.graphic('<path d="M12 2.5c.7 5.8 3.7 8.8 9.5 9.5-5.8.7-8.8 3.7-9.5 9.5-.7-5.8-3.7-8.8-9.5-9.5 5.8-.7 8.8-3.7 9.5-9.5Z"/>')}</span>
      <div class="rewards-points-copy">
        <div class="card-top"><h2 id="rewards-points-title">Canopy Points</h2><span class="tag">Coming soon</span></div>
        <p>Details on earning and using points will be announced at launch.</p>
      </div>
    </section>
    <div class="rewards-layout">
      <section class="card rewards-claim" aria-labelledby="rewards-claim-title">
        <div class="card-top"><h2 id="rewards-claim-title">Staking rewards</h2><span class="tag">Demo Mode</span></div>
        <div class="rewards-balance">${CanopyUI.token('ZRO')}<strong>${num(state.rewards)} <span>ZRO</span></strong></div>
        <p class="form-note">${claimable?'Claiming adds this sample ZRO to your demo portfolio.':alreadyClaimed?'You already claimed your demo rewards. See the receipt in your claim history.':'You have no demo rewards available to claim.'}</p>
        ${claimable?'<button class="primary" type="button" data-action="claim">Claim demo rewards</button>':'<button class="secondary" type="button" data-action="reset-demo">Reset demo…</button>'}
      </section>
      <section class="card activity-card rewards-history" aria-labelledby="rewards-history-title">
        <div class="card-top"><h2 id="rewards-history-title">Claim history</h2></div>
        ${activityRows('Claim')}
      </section>
    </div>`;
}
function render(preserveRange=false){
  settleDueActivity();
  if(!preserveRange)range='1W';
  const [fragment, mode] = location.hash.slice(1).split('/');
  // The submitted #testnet and older #bridge URLs still open the trade workspace.
  const route = fragment === 'testnet' || fragment === 'bridge' ? 'swap' : fragment;
  tradeMode = fragment === 'bridge' || (fragment === 'swap' && mode === 'bridge') ? 'bridge' : 'swap';
  page=Object.hasOwn(names,route)?route:'portfolio';
  nav();
  const views={portfolio,markets,swap:demoTrade,stake,perps:comingSoon,rewards,activity};
  $('#main').innerHTML=views[page]();
  if(page==='swap') mountDemoTrade();
  if(page==='markets') mountMarketDirectory();
  hydrateCharts();
  if(!preserveRange)CanopyUI.enter($('#main'));
  scheduleActivityTick();
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
  const feePercent = tradeFeePercent[tradeMode];
  const received = validAmount ? Number((amount * rate * (1 - feePercent / 100)).toFixed(7)) : 0;
  const slippageInput = bridge ? null : $('#trade-slippage');
  const slippagePercent = slippageInput ? Number(slippageInput.value) : null;
  const validSlippage = bridge || (Number.isFinite(slippagePercent) && slippagePercent >= 0.01 && slippagePercent <= 5);
  const minimumReceived = !bridge && validSlippage ? Math.floor(Math.round(received * 1e7) * (1 - slippagePercent / 100)) / 1e7 : null;
  const recipientMode = $('#trade-recipient-mode').value;
  const addressInput = $('#trade-recipient');
  const recipient = recipientMode === 'external' ? addressInput.value.trim() : null;
  const validRecipient = recipient === null || isWalletAddress(recipient);
  $('#trade-recipient-address').hidden = recipient === null;
  addressInput.setAttribute('aria-invalid', String(!validRecipient));
  const recipientNote = $('#trade-recipient-note');
  recipientNote.hidden = validRecipient;
  recipientNote.textContent = validRecipient ? '' : 'Enter a nonzero EVM wallet address.';
  if (slippageInput) {
    slippageInput.setAttribute('aria-invalid', String(!validSlippage));
    const slippageNote = $('#trade-slippage-note');
    slippageNote.hidden = validSlippage;
    slippageNote.textContent = validSlippage ? '' : 'Enter a tolerance between 0.01% and 5%.';
    for (const preset of document.querySelectorAll('[data-slippage-percent]')) {
      preset.setAttribute('aria-pressed', String(validSlippage && Number(preset.dataset.slippagePercent) === slippagePercent));
    }
  }

  const error = !validAmount ? 'Enter an amount'
    : amount > balance ? 'Insufficient demo balance'
    : bridge && draft.source === draft.destination ? 'Choose different networks'
    : !bridge && from === to ? 'Choose different assets'
    : !Number.isFinite(received) || received <= 0 ? 'Invalid quote amount'
    : !validSlippage ? 'Check slippage settings'
    : !bridge && minimumReceived <= 0 ? 'Amount too small after slippage'
    : !validRecipient ? 'Check the recipient address'
    : '';
  Object.assign(draft, {from, to, amount: amountField.value, recipientMode, recipient: addressInput.value});
  if (slippageInput) draft.slippage = slippageInput.value;
  $('#pay-token-logo').innerHTML = CanopyUI.token(from);
  $('#receive-token-logo').innerHTML = CanopyUI.token(to);
  $('#receive').value = validAmount ? received : '';
  $('#balance-label').textContent = `Balance: ${num(balance)} ${from}`;
  $('#pay-usd').textContent = money(validAmount ? amount * fromAsset.price : 0);
  $('#receive-usd').textContent = money(received * toAsset.price);
  if (!bridge) {
    $('#rate').textContent = `1 ${from} = ${rate.toLocaleString('en-US', {maximumSignificantDigits: 6})} ${to}`;
    $('#minimum-received').textContent = minimumReceived > 0 ? `${amountText(minimumReceived)} ${to}` : '—';
    updateSwapChart(from, to);
  }
  const review = $('#review-trade');
  review.disabled = Boolean(error);
  review.textContent = error || `Review demo ${tradeMode}`;
  return error ? null : {from, to, amount, received, minimumReceived, slippagePercent, feePercent, recipient};
}

const appDialog = $('#modal');
function showModal(html) {
  const content = $('#modal-content');
  appDialog.classList.remove('chart-modal');
  content.innerHTML = `<button type="button" class="close" aria-label="Close dialog">×</button>${html}`;
  const closeButton = $('#modal-content .close');
  closeButton.onclick = () => appDialog.close();
  if (!appDialog.open) appDialog.showModal();
  else if (!content.contains(document.activeElement)) closeButton.focus({ preventScroll: true });
  CanopyUI.enter(content);
}

let backdropPressed = false;
function isBackdropEvent(event) {
  if (event.target !== appDialog) return false;
  const { left, right, top, bottom } = appDialog.getBoundingClientRect();
  return event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom;
}
appDialog.addEventListener('pointerdown', event => { backdropPressed = isBackdropEvent(event); });
appDialog.addEventListener('pointercancel', () => { backdropPressed = false; });
appDialog.addEventListener('click', event => {
  if (backdropPressed && isBackdropEvent(event)) appDialog.close();
  backdropPressed = false;
});
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),3200)}
function log(type,detail,symbols=[],receipt){
  const time=new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
  const index=state.activity.push({type,detail,symbols,time,receipt,demoHash:createDemoHash()})-1;
  persist();
  return index;
}
function reviewTrade() {
  const action = tradeMode;
  const bridge = action === 'bridge';
  const quote = updateQuote();
  if (!quote) return;
  const {from, to, amount, received, minimumReceived, slippagePercent, feePercent, recipient} = quote;
  const source = bridge ? $('#from-network').value : null;
  const destination = bridge ? $('#to-network').value : null;
  const route = bridge ? `${source} to ${destination}` : '';
  const type = bridge ? 'Bridge' : 'Swap';
  showModal(`<div class="modal-icon">${bridge ? '◎' : '⇄'}</div>
    <h2>Review demo ${action}</h2>
    <p>${bridge ? route : 'Check amounts and fees before confirming.'}</p>
    <div class="trade-details">
      <div><span>You pay</span><b>${amountText(amount)} ${from}</b></div>
      <div><span>Estimated receipt</span><b>${amountText(received)} ${to}</b></div>
      ${bridge ? '' : `<div><span>Minimum received</span><b>${amountText(minimumReceived)} ${to}</b></div><div><span>Slippage tolerance</span><b>${slippagePercent}%</b></div>`}
      <div><span>${bridge ? 'Bridge fee' : 'Trading fee'}</span><b>${feePercent}%</b></div>
      <div><span>Network fee</span><b>Illustrative · $0.08</b></div>
      <div><span>Recipient</span><b class="trade-review-recipient">${recipient || 'My demo wallet'}</b></div>
      <div><span>Demo timing</span><b>${demoActivityDuration[type]/1000} seconds</b></div>
      <div><span>Mode</span><b>Simulation only</b></div>
    </div>
    <p>${bridge ? 'This records a demo bridge route. Destination balances are not connected.' : recipient ? 'Output is simulated for this recipient and will not enter your demo portfolio.' : 'Sample tokens arrive in your portfolio after the countdown.'} No real assets will move.</p>
    <p class="form-note" id="trade-submit-status" role="status"></p>
    <button class="primary full" id="confirm">Simulate ${action}</button>`);
  const button = $('#confirm');
  button.onclick = () => {
    if (button.disabled) return;
    button.disabled = true;
    if (!Number.isFinite(amount) || amount <= 0 || amount > (state.balances[from] ?? 0) || !(received > 0)) {
      $('#trade-submit-status').textContent='The amount is no longer available. Open a new quote.';
      return;
    }
    const now = Date.now();
    const receipt = {endsAt:now+demoActivityDuration[type], sourceAt:bridge?now+5000:null, source, destination, from, amount, to, received, minimumReceived, slippagePercent, feePercent, recipient, settled:false};
    if (!bridge) state.balances[from] -= amount;
    let index;
    try {
      index=log(type, bridge ? `${num(amount)} ${from} · ${route}` : `${num(amount)} ${from} to ${num(received)} ${to}`, bridge ? [from] : [from,to], receipt);
    } catch {
      state.activity.pop();
      if (!bridge) state.balances[from] += amount;
      $('#trade-submit-status').textContent='Could not save this demo trade. Try again.';
      button.disabled=false;
      return;
    }
    render(true);
    openActivityDetails(index);
  };
}
function assetDetail(symbol){
  const asset=assets.find(item=>item.symbol===symbol);
  if(!asset)return;
  const inDemo=demoSwapTokens.includes(symbol);
  showModal(`<div class="asset-name" style="margin-bottom:22px">${coin(asset)}<div><h2 style="margin:0">${asset.name}</h2><small>${symbol}${asset.demoLabel?' · '+asset.demoLabel:''}</small></div></div>${liveChart(symbol,'detail-chart')}<div class="modal-actions">${watchToggle(asset,true)}${inDemo?'<button class="primary" id="trade-asset">Open swap</button>':''}</div>`);
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
  showModal(`<h2>Stake demo ZRO</h2><p>Move sample ZRO from your available balance to your staked total.</p><label class="modal-label" for="stake-amount">Amount · Available ${num(state.balances.ZRO)} ZRO</label><input class="modal-input" type="number" inputmode="decimal" min="0" step="any" id="stake-amount" value="${Math.min(1,state.balances.ZRO)}">${amountShortcuts('stake-amount-shortcuts')}<p id="stake-error" class="negative" role="status"></p><button class="primary full" id="confirm-stake">Simulate stake</button>`);
  const input=$('#stake-amount');
  const error=$('#stake-error');
  const clearError=()=>{error.textContent='';};
  mountAmountShortcuts($('#stake-amount-shortcuts'), input, () => state.balances.ZRO, clearError);
  input.addEventListener('input', clearError);
  $('#confirm-stake').onclick=()=>{
    const amount=Number(input.value);
    if(!Number.isFinite(amount)||amount<=0||amount>state.balances.ZRO){error.textContent='Enter an amount within your available balance.';return;}
    state.balances.ZRO-=amount;
    state.staked+=amount;
    log('Stake',`${num(amount)} ZRO`,['ZRO']);
    $('#modal').close();render();toast(`${num(amount)} ZRO staked in demo`);
  };
}
function claimDemoRewards(){
  if(state.rewards<=0)return;
  showModal(`<h2>Claim your demo rewards</h2><p>Move ${num(state.rewards)} sample ZRO to your available balance.</p><p class="form-note negative" id="claim-reward-error" role="status" hidden></p><button class="primary full" id="confirm-claim">Simulate claim</button>`);
  const confirm=$('#confirm-claim');
  const error=$('#claim-reward-error');
  confirm.onclick=()=>{
    if(confirm.disabled||state.rewards<=0)return;
    confirm.disabled=true;
    error.hidden=true;
    const {rewards}=state;
    const balance=state.balances.ZRO;
    const activityCount=state.activity.length;
    state.balances.ZRO=balance+rewards;
    state.rewards=0;
    try {
      log('Claim',`${num(rewards)} ZRO rewards`,['ZRO']);
    } catch {
      state.balances.ZRO=balance;
      state.rewards=rewards;
      state.activity.length=activityCount;
      error.textContent='Could not save the claim. Your demo balance is unchanged. Try again.';
      error.hidden=false;
      confirm.disabled=false;
      return;
    }
    $('#modal').close();
    render();
    toast('Demo rewards claimed');
  };
}
document.addEventListener('click',event=>{
  const button=event.target.closest('button, tr[data-asset]');
  if(!button)return;
  const action=button.dataset;
  if(action.activityIndex!=null){openActivityDetails(Number(action.activityIndex));return;}
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
  if(action.hold){holdTab=action.hold;render();}
  if(action.mini==='watchlist')showMarketView('watchlist');
  if(action.asset)assetDetail(action.asset);
  if(action.stake)stakeModal(action.stake);
  if(action.action==='claim')claimDemoRewards();
  if(action.action==='reset-demo')confirmResetDemo();
});
function confirmResetDemo(){
  showModal(`<h2>Reset your demo?</h2><p>This restores the starting balances and clears your simulated transaction and claim history in this browser.</p><p id="reset-demo-error" class="form-note negative" role="status" hidden></p><button type="button" class="primary full" id="confirm-reset">Reset demo</button>`);
  $('#confirm-reset').onclick=()=>{
    try { localStorage.removeItem(demoStateKey); }
    catch {
      const error=$('#reset-demo-error');
      error.hidden=false;
      error.textContent='Could not reset the demo in this browser.';
      return;
    }
    location.reload();
  };
}
$('#reset').onclick=confirmResetDemo;
function setTheme(theme){document.documentElement.dataset.theme=theme;try { localStorage.setItem('canopy-zero-theme',theme); } catch {}$('#appearance').setAttribute('aria-label',`Switch to ${theme==='light'?'dark':'light'} mode`);$('#appearance').title=`Switch to ${theme==='light'?'dark':'light'} mode`;$('#mobile-theme').setAttribute('aria-label',`Switch to ${theme==='light'?'dark':'light'} mode`);$('#appearance').innerHTML=theme==='light'?CanopyUI.moon:CanopyUI.sun;$('#mobile-theme').innerHTML=theme==='light'?CanopyUI.moon:CanopyUI.sun;document.querySelectorAll('[data-tv]').forEach(el=>{delete el.dataset.loaded;el.innerHTML=''});hydrateCharts()}
$('#mobile-theme').onclick=()=>$('#appearance').click();
$('#appearance').onclick=()=>setTheme(document.documentElement.dataset.theme==='light'?'dark':'light');
function openMarketSearch(){
  if(page!=='markets'){
    showMarketView('all');
    history.pushState(null,'','#markets');
    render();
  }
  // Keep focus inside the click gesture so mobile browsers can open the keyboard.
  $('#search')?.focus();
}
$('#global-search').onclick=openMarketSearch;
document.addEventListener('keydown',event=>{
  if(event.key!=='/' || document.documentElement.classList.contains('welcome-open') ||
    ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName) || appDialog.open)return;
  event.preventDefault();
  openMarketSearch();
});
document.addEventListener('click',event=>{
  const button=event.target.closest('button,[data-market-row]');
  if(!button)return;
  const {pin,selectMarket,marketRow,marketCategory:category,marketView:view,marketWatchlist,marketMore,marketClear}=button.dataset;
  if(pin){
    const asset=assets.find(item=>item.symbol===pin);
    if(!asset)return;
    const pinned=!watchlist.includes(pin);
    watchlist=pinned?[...watchlist,pin]:watchlist.filter(symbol=>symbol!==pin);
    try { localStorage.setItem(watchlistKey,JSON.stringify(watchlist)); } catch {}
    const radar=$('#market-overview-watchlist');
    if(radar)radar.innerHTML=marketOverviewWatchlist();
    if(page==='markets'&&marketDirectory.watchlist)refreshMarketIndex();
    for(const toggle of document.querySelectorAll(`[data-pin="${pin}"]`)){
      toggle.setAttribute('aria-pressed',String(pinned));
      toggle.title=`${pinned?'Remove from':'Add to'} watchlist`;
      toggle.innerHTML=pinContents(pinned,toggle.classList.contains('watch-action'));
    }
    if(page==='markets'&&!button.isConnected)$('#market-watch-filter')?.focus({preventScroll:true});
    toast(`${asset.symbol} ${pinned?'added to':'removed from'} Watchlist`);
    return;
  }
  if(page!=='markets')return;
  if(selectMarket||marketRow){assetDetail(selectMarket||marketRow);return;}
  if(view){showMarketView(view);return;}
  if(category){marketDirectory.category=category;marketDirectory.limit=marketPageSize;refreshMarketIndex();}
  if(marketWatchlist!==undefined){marketDirectory.watchlist=!marketDirectory.watchlist;marketDirectory.limit=marketPageSize;refreshMarketIndex();}
  if(marketClear!==undefined)showMarketView('all');
  if(marketMore!==undefined){
    const firstNew=marketMatches()[marketDirectory.limit];
    marketDirectory.limit+=marketPageSize;
    refreshMarketIndex();
    if(firstNew)$(`[data-market-row="${firstNew.symbol}"] [data-select-market]`)?.focus({preventScroll:true});
  }
});
setTheme(document.documentElement.dataset.theme||'light');
window.addEventListener('hashchange',()=>{
  if(appDialog.open)appDialog.close();
  render();window.scrollTo(0,0);$('.shell').scrollTo(0,0);
  if(page==='markets'&&pendingMarketView){
    const view=pendingMarketView;
    pendingMarketView='';
    focusMarketIndex(view);
  }
});
render();
