import createContract from "../web3Initiate";
import stakingAbi from "./abiManager/staking.json";

async function getUserStaking(address: String) {
  try {
    const contract = await createContract(
      stakingAbi,
      process.env.REACT_APP_STAKING_CONTRACT
    );
    let userStaked = await contract.methods.getTotalStaked(address).call();
    return userStaked;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default getUserStaking;
