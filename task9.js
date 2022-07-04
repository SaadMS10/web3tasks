const { exit } = require("process");
const Web3 = require("web3");
const {
  alchemyWS,
  contractAddress,
  contractABI,
  ownerAddress,
} = require("./utils/keys");
const web3 = new Web3(alchemyWS);
const fetchAllTransfer =async (address) => {
  var contract = new web3.eth.Contract(contractABI, address);
  contract.events.Transfer({
    fromBlock: 0
}, function(error, event){ 
    if(event){
        console.log("Token Transfer", web3.utils.fromWei(event.returnValues.value,'ether'), "ETH");
        exit(0);
    }
})

};


fetchAllTransfer(contractAddress);