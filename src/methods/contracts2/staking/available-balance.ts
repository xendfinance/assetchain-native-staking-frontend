import retrieveAddress from "../../utils/retrieve-address";

async function availableBalance() {
  try {
    const ownerAddress = retrieveAddress();
    const Web3 = require('web3');
    const web3 = new Web3(process.env.REACT_APP_RPC_URL)

    let balance = await web3.eth.getBalance(ownerAddress);
    balance = Number(balance) * Math.pow(10, -18)
    return balance;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default availableBalance;
