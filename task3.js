const Web3 = require("web3");
const {
  alchemyWS,
  contractAddress,
  contractABI,
} = require("./utils/keys");
const web3 = new Web3(alchemyWS);

const fetchEvent = (address, eventName, startBlock, endBlock) => {
  var contract = new web3.eth.Contract(contractABI, address);
  contract
    .getPastEvents(
      eventName,
      {
        fromBlock: startBlock,
        toBlock: endBlock,
      },
      function (error, events) {
        if(events.length > 0){
            console.log("Block Number:", events[0].blockNumber);
            console.log("TX Hash:", events[0].transactionHash);
            console.log("Event Name:", events[0].event);
            console.log(events[0].returnValues);
            console.log(events[0].raw);
            console.log("");

        }
        else{
            console.log("No events found with in that block range");
        }
      }
    )
};

console.log("Fetching event");
fetchEvent(contractAddress, "Transfer", 0, 10930618);
