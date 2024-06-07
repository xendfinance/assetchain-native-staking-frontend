import createContract from "../web3Initiate";
import stakingAbi from "./abiManager/staking.json";

//Lock period is the time after which users can now unstake
async function lockPeriod() {
  try {
    const contract = await createContract(
      stakingAbi,
      process.env.REACT_APP_STAKING_CONTRACT
    );
    let totalStaked = await contract.methods.lockTime().call();
    return totalStaked;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default lockPeriod;
