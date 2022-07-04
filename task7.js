const { exit } = require("process");
const Web3 = require("web3");
const {
  alchemyWS,
  ownerAddress,
  senderAddress,
  privateKey,
} = require("./utils/keys");
const web3 = new Web3(alchemyWS);
const SpeedUp = async () => {
  const nonce = await web3.eth.getTransactionCount(ownerAddress);
  console.log("Nonce", nonce);
  console.log("Speeding Up");
  const sendTransaction = await web3.eth.accounts.signTransaction(
    {
      from: ownerAddress,
      to: senderAddress,
      value: 10000000000,
      gas: "21000",
      gasPrice: "1500000000",
      nonce: nonce,
    },
    privateKey
  );
  console.log(sendTransaction);
  if (sendTransaction) {
    web3.eth
      .sendSignedTransaction(sendTransaction.rawTransaction)
      .on("transactionHash", function (hash) {
        console.log("Tx Hash", hash);
      })
      .on("confirmation", async function (confirmationNumber, receipt) {
        if (confirmationNumber === 1 && receipt.status) {
          console.log("Transaction Successful");
          console.log(
            "Tx Fee:",
            web3.utils.fromWei(
              web3.utils.BN(receipt.gasUsed * receipt.effectiveGasPrice),
              "ether"
            ),
            "ETH"
          );
          exit(0);
        }
      });
  }
};
const CancelTransaction = async () => {
  const nonce = await web3.eth.getTransactionCount(ownerAddress);
  console.log("Cancelling Transaction");
  const sendTransaction = await web3.eth.accounts.signTransaction(
    {
      to: ownerAddress,
      value: 0,
      gas: "21000",
      gasPrice: "1500000000",
      nonce: nonce,
    },
    privateKey
  );
  if (sendTransaction) {
    web3.eth
      .sendSignedTransaction(sendTransaction.rawTransaction)
      .on("transactionHash", function (hash) {
        console.log("Tx Hash", hash);
      })
      .on("confirmation", async function (confirmationNumber, receipt) {
        if (confirmationNumber === 1 && receipt.status) {
          console.log("Transaction Successful");
          console.log(
            "Tx Fee:",
            web3.utils.fromWei(
              web3.utils.BN(receipt.gasUsed * receipt.effectiveGasPrice),
              "ether"
            ),
            "ETH"
          );
          exit(0);
        }
      });
  }
};
const Transaction = async () => {
  const sign = await web3.eth.accounts.signTransaction(
    {
      from: ownerAddress,
      to: senderAddress,
      value: 0,
      gas: "21000",
      gasPrice: "1100000000",
    },
    privateKey
  );
  if (sign) {
    web3.eth
      .sendSignedTransaction(sign.rawTransaction)
      .on("transactionHash", function (hash) {
        console.log("Tx Hash", hash);
        CancelTransaction();
      })
      .on("confirmation", async function (confirmationNumber, receipt) {
        if (confirmationNumber === 1 && receipt.status) {
          console.log("Transaction Successful");
          console.log(
            "Tx Fee:",
            web3.utils.fromWei(
              web3.utils.BN(receipt.gasUsed * receipt.effectiveGasPrice),
              "ether"
            ),
            "ETH"
          );
          exit(0);
        }
      })
      .on("error", console.error);
  } else {
    console.log(" Sign Transaction Failed");
  }
};
Transaction();