import createContract from "../web3Initiate";
import stakingAbi from "./abiManager/staking.json";

async function estimatedRewards() {
  try {
    const contract = await createContract(
      stakingAbi,
      process.env.REACT_APP_STAKING_CONTRACT
    );
    let rewards = await contract.methods.apr().call();
    return rewards
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default estimatedRewards;
