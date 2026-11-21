import {Interface,parseEther,getAddress} from 'ethers';
export const BRIDGE_SOURCE=11155111;
export const TESTNET_INBOXES=Object.freeze({46630:'0xF2939afA86F6f933A3CE17fCAB007907B6b0B7a4',421614:'0xaAe29B0366299461418F5324a79Afc425BE5ae21'});
export function bridgeRequest(source,destination,input){
 if(Number(source)!==BRIDGE_SOURCE)throw Error('Switch your wallet to Ethereum Sepolia to bridge.');
 if(!Object.hasOwn(TESTNET_INBOXES,destination))throw Error('Choose Robinhood testnet or Arbitrum Sepolia. Direct L2-to-L2 routes are not supported.');
 if(typeof input!=='string'||!/^\d+(\.\d{1,18})?$/.test(input.trim()))throw Error('Enter a positive test ETH amount with up to 18 decimal places.');
 const value=parseEther(input.trim());if(value<=0n)throw Error('Enter an amount greater than zero.');
 return {to:getAddress(TESTNET_INBOXES[destination]),data:new Interface(['function depositEth() payable returns (uint256)']).encodeFunctionData('depositEth'),value,chainId:BRIDGE_SOURCE};
}
export function assertBridgeAccount(code,target){if(code!=='0x')throw Error('This bridge supports standard wallets only. Your account has smart-wallet or delegation code; use the official bridge to avoid sending to an aliased address.');if(!target||target==='0x')throw Error('The bridge contract was not found on Ethereum Sepolia. Check your wallet network.');}
export function assertBridgeFunds(balance,amount,gas,fee){if(balance<amount+gas*fee)throw Error('Not enough Ethereum Sepolia ETH for this deposit plus gas. ETH on RH or Arbitrum cannot pay the Sepolia fee.');}
