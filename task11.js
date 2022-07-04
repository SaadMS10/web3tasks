const { exit } = require("process");
const Web3 = require("web3");
const {
  alchemyWS,
  contractAddress,
  contractABI,
  ownerAddress,
} = require("./utils/keys");
const web3 = new Web3(alchemyWS);

const fetchAllHolders =async (address) => {
  allAddress=[];
  var contract =  await  new web3.eth.Contract(contractABI, address);
  contract.events.Transfer({
    fromBlock: 0
}, function(error, event){ 
    if(event){
        allAddress.push(event.returnValues.from);
        allAddress.push(event.returnValues.to);     
        uniqueAdd = [...new Set(allAddress)];
        console.log("Total Number of Holder",uniqueAdd.length);
        exit(0);
    }
})
};
fetchAllHolders(contractAddress);


  
