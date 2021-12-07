/**
 * This function is used to create contracts web3 objects used for calling contract methods.
 * @param abi
 * @param contractAddress
 */

import App from "App";
import getNodeUrl from "utils/node-url";



async function balanceFormatterCategories(balance: any) {
  
  const Web3 = require('web3');
	const web3Instance = new Web3(getNodeUrl())

  if (web3Instance) {
  
    const FormattedResult =  formatter.format(balance).replace(/\$/g, '');;

   
    return FormattedResult;
  } else {
    throw "Cant Format Balance";
  }


}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

});

export default balanceFormatterCategories;
