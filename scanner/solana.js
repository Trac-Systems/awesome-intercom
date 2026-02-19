const { Connection, PublicKey, LAMPORTS_PER_SOL } = require("@solana/web3.js");

module.exports = async function scanSOL(address) {
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const balance = await connection.getBalance(new PublicKey(address));

  return `SOL Balance : ${balance / LAMPORTS_PER_SOL}`;
};
