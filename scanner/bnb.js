const { JsonRpcProvider, formatEther } = require("ethers");

module.exports = async function scanBNB(address) {
  const provider = new JsonRpcProvider("https://bsc.publicnode.com");
  const balance = await provider.getBalance(address);

  return `BNB Balance : ${formatEther(balance)}`;
};
