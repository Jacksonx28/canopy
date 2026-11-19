import fs from 'node:fs';
import solc from 'solc';
import {build} from 'esbuild';
const input={language:'Solidity',sources:{'Pool.sol':{content:fs.readFileSync('contracts/CanopyTestPool.sol','utf8')}},settings:{optimizer:{enabled:true,runs:200},evmVersion:'paris',outputSelection:{'*':{'*':['abi','evm.bytecode.object','evm.deployedBytecode.object']}}}};
const out=JSON.parse(solc.compile(JSON.stringify(input)));if(out.errors?.some(x=>x.severity==='error'))throw Error(JSON.stringify(out.errors));
const c=out.contracts['Pool.sol'].CanopyTestPool;
fs.writeFileSync('dist/data/pool.json',JSON.stringify({abi:c.abi,bytecode:'0x'+c.evm.bytecode.object,runtime:'0x'+c.evm.deployedBytecode.object}));
await build({entryPoints:['src/testnet.js'],outfile:'dist/testnet.js',bundle:true,minify:true,format:'esm',target:'es2022'});
