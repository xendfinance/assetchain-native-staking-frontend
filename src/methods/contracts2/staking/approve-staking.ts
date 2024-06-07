import createContract from "../contract-creator";
import erc20Abi from "./abiManager/erc20.json";
import retrieveAddress from "../../utils/retrieve-address";

import getFastGasFeeMatic from "../gas-fee";

async function approveStaking(price: any, tokenAddress: String) {
  try {
    const ownerAddress = retrieveAddress();
    const contract = await createContract(erc20Abi, tokenAddress);
    let gasFee = await getFastGasFeeMatic();

    let res = await contract.methods
      .approve(process.env.REACT_APP_STAKING_CONTRACT, String(price))
      .send({ from: ownerAddress, gasPrice: gasFee });

    let response = await contract.methods
      .allowance(ownerAddress, process.env.REACT_APP_STAKING_CONTRACT)
      .call();
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export default approveStaking;
