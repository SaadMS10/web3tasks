const { exit } = require("process");
const Web3 = require("web3");
const {
  alchemyWS,
  contractAddress,
  contractABI,
} = require("./utils/keys");
const web3 = new Web3(alchemyWS);
var contract = new web3.eth.Contract(contractABI, contractAddress);
const subsribeEvent=(address,eventName)=>{
      contract.events[eventName]({
      fromBlock: 0,
  }, function(error, event){
      console.log("Event Name:",event.event)
      var subscription = web3.eth.subscribe('logs', {
        address: [address],
        topics: event.raw.topics,
        fromBlock: 0,
    }, function(error, result){
        if (error)
            console.log('error',error);        
    })
    .on("data", function(log){
        console.log(log);
        exit(0);
    })

   })
}

subsribeEvent(contractAddress, "Transfer");