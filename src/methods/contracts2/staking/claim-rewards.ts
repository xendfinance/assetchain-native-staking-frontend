import createContract from "../contract-creator";
import stakingAbi from "./abiManager/staking.json";
import retrieveAddress from "../../utils/retrieve-address";
import getFastGasFeeMatic from "../gas-fee";

async function claimRewards() {
  try {
    const ownerAddress = retrieveAddress();
    let gasFee = await getFastGasFeeMatic();
    const contract = await createContract(
      stakingAbi,
      process.env.REACT_APP_STAKING_CONTRACT
    );
    let claim = await contract.methods
      .claimReward()
      .send({ from: ownerAddress, gasPrice: gasFee });
    return claim;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default claimRewards;
