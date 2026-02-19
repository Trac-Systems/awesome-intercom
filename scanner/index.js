const readline = require("readline");
const chalk = require("chalk");

const scanETH = require("./eth");
const scanBNB = require("./bnb");
const scanBASE = require("./base");
const scanSOL = require("./solana");
const scanTRACNetwork = require("./trac-network"); // TRAC Network trac1/trac10

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function mainMenu() {
  console.clear();
  console.log(chalk.cyan("===================================="));
  console.log(chalk.magenta(" 🚀 WELCOME TO MY INTERCOME SCANNER "));
  console.log(chalk.cyan("===================================="));
  console.log(chalk.yellow("[1] Scan ETH"));
  console.log(chalk.green("[2] Scan BNB"));
  console.log(chalk.blue("[3] Scan BASE"));
  console.log(chalk.magenta("[4] Scan SOLANA"));
  console.log(chalk.yellow("[5] Scan TRAC Network (trac1/trac10)"));
  console.log(chalk.red("[0] Exit"));
  console.log(chalk.cyan("===================================="));

  rl.question("Pilih menu ➜ ", async (menu) => {
    if (menu === "0") {
      console.log(chalk.red("Keluar..."));
      rl.close();
      return;
    }

    rl.question("Masukkan address ➜ ", async (address) => {
      try {
        let result;
        console.log(chalk.gray("\n⏳ Scanning...\n"));

        if (menu === "1") result = await scanETH(address);
        else if (menu === "2") result = await scanBNB(address);
        else if (menu === "3") result = await scanBASE(address);
        else if (menu === "4") result = await scanSOL(address);
        else if (menu === "5") result = await scanTRACNetwork(address);
        else throw new Error("Menu tidak valid");

        console.log(chalk.green("✅ HASIL SCAN"));
        console.log(result);
      } catch (err) {
        console.log(chalk.red("❌ Error:"), err.message);
      }

      // kembali ke menu
      await new Promise(r => setTimeout(r, 1500));
      mainMenu();
    });
  });
}

// start program
mainMenu();
