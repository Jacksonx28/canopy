// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
/// Test ETH / CAN constant-product pool. No mainnet deployment or withdrawals.
contract CanopyTestPool {
 string public constant name = "Canopy Test Token";
 string public constant symbol = "CAN";
 uint8 public constant decimals = 18;
 uint public constant totalSupply = 200000 ether;
 mapping(address => uint) public balanceOf;
 bool private locked;
 event Transfer(address indexed from,address indexed to,uint amount);
 event Swap(address indexed account,bool buyToken,uint input,uint output);
 modifier guard(){require(!locked,"Busy");locked=true;_;locked=false;}
 constructor() payable {
  require(block.chainid==46630 || block.chainid==421614 || block.chainid==11155111,"Testnets only");
  require(msg.value>=0.001 ether,"Seed at least 0.001 ETH");
  balanceOf[address(this)]=100000 ether;balanceOf[msg.sender]=100000 ether;
  emit Transfer(address(0),address(this),100000 ether);emit Transfer(address(0),msg.sender,100000 ether);
 }
 function transfer(address to,uint amount) external returns(bool){require(to!=address(0),"Zero address");balanceOf[msg.sender]-=amount;balanceOf[to]+=amount;emit Transfer(msg.sender,to,amount);return true;}
 function quoteBuy(uint amount) public view returns(uint){return amount*997*balanceOf[address(this)]/(address(this).balance*1000+amount*997);}
 function quoteSell(uint amount) public view returns(uint){return amount*997*address(this).balance/(balanceOf[address(this)]*1000+amount*997);}
 function buy(uint minimum,uint deadline) external payable guard {
  require(block.timestamp<=deadline && msg.value>0,"Expired or zero");
  uint output=msg.value*997*balanceOf[address(this)]/((address(this).balance-msg.value)*1000+msg.value*997);
  require(output>0 && output>=minimum,"Slippage");balanceOf[address(this)]-=output;balanceOf[msg.sender]+=output;
  emit Transfer(address(this),msg.sender,output);emit Swap(msg.sender,true,msg.value,output);
 }
 function sell(uint amount,uint minimum,uint deadline) external guard {
  require(block.timestamp<=deadline && amount>0,"Expired or zero");uint output=quoteSell(amount);
  require(output>0 && output>=minimum,"Slippage");balanceOf[msg.sender]-=amount;balanceOf[address(this)]+=amount;
  emit Transfer(msg.sender,address(this),amount);(bool ok,)=msg.sender.call{value:output}("");require(ok,"Transfer failed");emit Swap(msg.sender,false,amount,output);
 }
}
