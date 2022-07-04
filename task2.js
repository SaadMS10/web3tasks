const Web3 = require("web3");
const {
  alchemyWS,
  contractAddress,
  contractABI,
  ownerAddress,
  senderAddress,
} = require("./utils/keys");
const web3 = new Web3(alchemyWS);
const task2 = async () => {
  var contract = new web3.eth.Contract(contractABI, contractAddress);
  const balanceOf = await contract.methods.balanceOf(ownerAddress).call();
  console.log("balanceOf ", balanceOf);
  const transfer = await contract.methods
    .transfer(senderAddress, 10000000000)
    .call({ from: ownerAddress });
  if (transfer) {
    console.log("Transfer Successfully");
  }
  const transferFrom = await contract.methods
    .transferFrom(ownerAddress,senderAddress , 10000000000)
    .send({ from: ownerAddress });
  if (transferFrom) {
    console.log("Transfer Successfully");
  }
  const allowance= await contract.methods.allowance(ownerAddress,senderAddress).call({from:ownerAddress})
  console.log("allowance",allowance)
  const approve = await contract.methods.approve(senderAddress, 10000000000).send({from:ownerAddress});
  if(approve){
      console.log("Approve Successfully");
  }

};
task2();
