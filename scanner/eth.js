const { JsonRpcProvider, formatEther } = require("ethers");

module.exports = async function scanETH(address) {
  const provider = new JsonRpcProvider("https://ethereum.publicnode.com");
  const balance = await provider.getBalance(address);

  return `ETH Balance : ${formatEther(balance)}`;
};
