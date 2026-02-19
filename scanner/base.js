const { JsonRpcProvider, formatEther } = require("ethers");

module.exports = async function scanBASE(address) {
  const provider = new JsonRpcProvider("https://base.publicnode.com");
  const balance = await provider.getBalance(address);

  return `BASE Balance : ${formatEther(balance)}`;
};

