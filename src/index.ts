import EtherScan from "./Etherscan";

/*
async function main()  {
  const etherscan = new EtherScan(process.env.ETHERSCAN_API_KEY!);
  const contractAbi = await etherscan.contract.getContractAbi("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"); // should get the contract abi of usdt on mainnet
  console.log(contractAbi);
}

void main();
*/

export { EtherScan };