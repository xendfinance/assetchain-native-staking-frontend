import createContract from "../contract-creator";
import stakingAbi from "./abiManager/staking.json";
import retrieveAddress from "../../utils/retrieve-address";
import getFastGasFeeMatic from "../gas-fee";

async function unstakeToken() {
  try {
    const ownerAddress = retrieveAddress();
    const contract = await createContract(
      stakingAbi,
      process.env.REACT_APP_STAKING_CONTRACT
    );
    let gasFee = await getFastGasFeeMatic();
    let unstaked = await contract.methods
      .unstake()
      .send({ from: ownerAddress, gasPrice: gasFee });
    return unstaked;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default unstakeToken;
