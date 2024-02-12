import createContract from "../web3Initiate";
import stakingAbi from "./abiManager/staking.json";

async function estimatedRewards() {
  try {
    const contract = await createContract(
      stakingAbi,
      process.env.REACT_APP_STAKING_CONTRACT
    );
    let estimatedRewards = await contract.methods.apy().call();
    return estimatedRewards;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default estimatedRewards;
