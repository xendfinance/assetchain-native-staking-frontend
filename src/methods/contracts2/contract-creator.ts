/**
 * This function is used to create contracts web3 objects used for calling contract methods.
 * @param abi
 * @param contractAddress
 */

async function createContract(abi: Array<any>, contractAddress: any) {
  const web3Instance = window.APPWEB3;
  if (web3Instance) {
    return new web3Instance.eth.Contract(abi, contractAddress);
  } else {
    throw "Can't create contract";
  }
}

export default createContract;
