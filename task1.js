const { exit } = require("process");
const Web3 = require("web3");
const {
  alchemyWS,
  ownerAddress,
  senderAddress,
  privateKey
} = require("./utils/keys");
const web3 = new Web3(alchemyWS);
const Transaction = async () => {
    const ownerBlnce=await web3.eth.getBalance(ownerAddress)
    const recieverAddress=await web3.eth.getBalance(senderAddress);  
    console.log("Owner Balance", web3.utils.fromWei(
        web3.utils.BN(ownerBlnce),
        "ether"
      ))
    console.log("Receiver Balance", web3.utils.fromWei(
        web3.utils.BN(recieverAddress),
        "ether"
      ))
    const sign = await web3.eth.accounts.signTransaction(
      {
        from: ownerAddress,
        to: senderAddress,
        value: 10000000,
        gas: "21000",
      },
      privateKey
    );
    if (sign) {
      web3.eth
        .sendSignedTransaction(sign.rawTransaction)
        .on("transactionHash", function (hash) {
          console.log("Tx Hash", hash);
        })
        .on("confirmation", async function (confirmationNumber, receipt) {
          if (confirmationNumber === 1 && receipt.status) {
            console.log("Transaction Successful");
            exit(0);
          }
        })
        .on("error", console.error);
    } else {
      console.log(" Sign Transaction Failed");
    }
  };
  Transaction();