import fs from 'node:fs';
import solc from 'solc';
import {build} from 'esbuild';
const input={language:'Solidity',sources:{'Pool.sol':{content:fs.readFileSync('contracts/CanopyTestPool.sol','utf8')}},settings:{optimizer:{enabled:true,runs:200},evmVersion:'paris',outputSelection:{'*':{'*':['abi','evm.bytecode.object','evm.deployedBytecode.object']}}}};
const out=JSON.parse(solc.compile(JSON.stringify(input)));if(out.errors?.some(x=>x.severity==='error'))throw Error(JSON.stringify(out.errors));
const c=out.contracts['Pool.sol'].CanopyTestPool;
fs.writeFileSync('tests/fixtures/canopy-test-pool.json',JSON.stringify({abi:c.abi,bytecode:'0x'+c.evm.bytecode.object,runtime:'0x'+c.evm.deployedBytecode.object}));
if(process.argv.includes('--dev-testnet')){
  fs.mkdirSync('.dev-testnet/data',{recursive:true});
  fs.copyFileSync('tests/fixtures/canopy-test-pool.json','.dev-testnet/data/pool.json');
  await build({entryPoints:['src/testnet.js'],outfile:'.dev-testnet/testnet.js',bundle:true,minify:true,format:'esm',target:'es2022'});
}

await build({entryPoints:['src/welcome.js'],outfile:'dist/welcome.js',bundle:true,minify:true,format:'esm',target:'es2022'});
