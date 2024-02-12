import createContract from "../web3Initiate";
import stakingAbi from "./abiManager/staking.json";
import retrieveAddress from "../../utils/retrieve-address";

async function pendingRewards() {
  try {
    const ownerAddress = retrieveAddress();
    const contract = await createContract(
      stakingAbi,
      process.env.REACT_APP_STAKING_CONTRACT
    );
    let pending = await contract.methods.pendingReward(ownerAddress).call();
    return pending;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default pendingRewards;
