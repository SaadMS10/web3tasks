const { exit } = require("process");
const fetch = require('node-fetch');
const Web3 = require("web3");
const {
  alchemyWS,
  ownerAddress,
  etherScanKey,
  privateKey
} = require("./utils/keys");
const web3 = new Web3(alchemyWS);
const getAllTransactions = async (address) => {
    const transactions = await fetch(
        `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=${etherScanKey}`
    );
    const transactionsJson = await transactions.json();
    return transactionsJson;
}
getAllTransactions(ownerAddress).then(data => {
    console.log(data.result);
    console.log("Total Transactions", data.result.length);
    exit(0);
}
);