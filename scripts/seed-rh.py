# -*- coding: utf-8 -*-
import json,concurrent.futures,time
from urllib.request import Request,urlopen
from urllib.parse import quote
from pathlib import Path
symbols=['CASHCAT','HOOKR','VICERAT','HMM','FRONG','TENDIES','BUN','FOREVER','MAGACITY','FOBO','ANTHROPIG','microduck','ZZZ','TSUKI','LOBIN','ROBINCAT','SCHIFFY','INU','PIZZA','GOOD','HOODRAT','GIGATENEV','CHUMP','RWA','PEPONS','CRUDECAT','GATO','ACAT']
def get(s):
 try:
  req=Request('https://api.dexscreener.com/latest/dex/search?q='+quote(s),headers={'User-Agent':'Mozilla/5.0','Accept':'application/json'})
  data=json.load(urlopen(req,timeout=20))
  pairs=[p for p in data.get('pairs',[]) if p.get('chainId')=='robinhood' and p.get('baseToken',{}).get('symbol','').lower()==s.lower()]
  return max(pairs,key=lambda p:p.get('liquidity',{}).get('usd',0)) if pairs else None
 except Exception:return None
pairs=[x for x in concurrent.futures.ThreadPoolExecutor(max_workers=4).map(get,symbols) if x]
Path('dist/data/rh-universe.json').write_text(json.dumps({'chain':'robinhood','method':'Curated meme discovery universe; not the official trending leaderboard','tokens':[p['baseToken'] for p in pairs]},indent=2))
Path('dist/data/rh-snapshot.json').write_text(json.dumps({'updatedAt':int(time.time()*1000),'pairs':pairs},indent=2))
print(json.dumps({'seedTokens':len(pairs),'symbols':[p['baseToken']['symbol'] for p in pairs]}))
