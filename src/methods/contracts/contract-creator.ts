/**
 * This function is used to create contracts web3 objects used for calling contract methods.
 * @param abi
 * @param contractAddress
 */

import getNodeUrl from "utils/node-url";



async function createContract(abi: Array<any>, contractAddress: any) {
  
  const Web3 = require('web3');
	const web3Instance = new Web3(getNodeUrl())

  if (web3Instance) {
    return new web3Instance.eth.Contract(abi, contractAddress);
  } else {
    throw "Can't create contract";
  }


}

export default createContract;
