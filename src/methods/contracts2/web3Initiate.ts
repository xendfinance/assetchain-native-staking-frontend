import web3 from "web3";

/**
 * This function is used to create contracts web3 objects used for calling contract methods.
 * @param abi
 * @param contractAddress
 */

async function web3Instance(abi: Array<any>, contractAddress: any) {
  let WEB3 = new web3(process.env.REACT_APP_RPC_URL);
  let CONTRACT = new WEB3.eth.Contract(abi, contractAddress);
  return CONTRACT;
}

export default web3Instance;
