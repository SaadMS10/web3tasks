const { exit } = require("process");
const Web3 = require("web3");
const {
  alchemyWS
} = require("./utils/keys");
const web3 = new Web3(alchemyWS);
const transactionReciept=(txHash)=>{
    var receipt = web3.eth.getTransactionReceipt(txHash)
.then(function(receipt){
    console.log(receipt);
    if(receipt.status){
        console.log("Transaction Successful");
        console.log("Tx Fee:",web3.utils.fromWei(web3.utils.BN(receipt.gasUsed*receipt.effectiveGasPrice),'ether'),'ETH');
        exit(0);
    }
    else{
        console.log("Transaction Failed");
    }s
}).catch(function(error){
    console.log(error);
    exit(0);
}
)
}
transactionReciept("0x46becb5baf5770b0f5afb16a7c8c5866b432fcdce47e97e351b5fd4ce52af467");