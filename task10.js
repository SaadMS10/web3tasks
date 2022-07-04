const { exit } = require("process");
const fetch = require('node-fetch');
const Web3 = require("web3");
const {
  alchemyWS,
  ownerAddress,
  etherScanKey,
  contractAddress
} = require("./utils/keys");
const web3 = new Web3(alchemyWS);
const getAllTransactions = async (address) => {
    const transactions = await fetch(
        `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=${etherScanKey}`
    );
    const transactionsJson = await transactions.json();
    return transactionsJson;
}
getAllTransactions(contractAddress).then(data => {
    console.log("Deployer Address",data.result[0].from);
    exit(0);
}
);