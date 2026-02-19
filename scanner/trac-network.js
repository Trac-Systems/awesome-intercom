// trac-network.js
const axios = require("axios");

module.exports = async function scanTRACNetwork(address) {
  try {
    const url = `https://explorer.trac.network/api/v1/address/${address}`;
    const response = await axios.get(url);

    return {
      chain: "TRAC Network",
      address,
      balance: response.data.balance || "0",
      transactions: response.data.transactions || [],
    };
  } catch (err) {
    return {
      chain: "TRAC Network",
      address,
      error: "Address not found or API error",
    };
  }
};
