const { exit } = require("process");
const Web3 = require("web3");
const { alchemyWS } = require("./utils/keys");
const web3 = new Web3(alchemyWS);
const ercTransfer = (TxHash) => {
  web3.eth
    .getTransaction(TxHash)
    .then(function (receipt) {
        console.log(receipt);
      const amount = web3.eth.abi.decodeParameters(
        [
          {
            type: "address",
            name: "_to",
          },
          {
            type: "uint256",
            name: "_value",
          },
        ],
        receipt.input.slice(10)
      );
        console.log("Sender Address", receipt.from);
        console.log("Recipient Address", amount._to);
        console.log("Token Transfer", web3.utils.fromWei(amount._value,'ether'), "ETH");

      exit(0);
    })
    .catch(function (error) {
      console.log(error);
      exit(0);
    });
};
ercTransfer(
  "0xdc42d05e79a23f13eacab35113a1806bf733b603c071410a13f71f024ba5543a"
);
