import Web3 from "web3";

async function getFastGasFeeMatic() {
  try {
    let web3 = new Web3(process.env.REACT_APP_RPC_URL);
    let gasPrice = await web3.eth.getGasPrice();
    return gasPrice
  } catch (err) {
    console.log(err);
  }
}

export default getFastGasFeeMatic;
