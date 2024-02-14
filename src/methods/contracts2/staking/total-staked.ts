import createContract from "../web3Initiate";
import stakingAbi from "./abiManager/staking.json";

async function getTotalStaking() {
  try {
    const contract = await createContract(
      stakingAbi,
      process.env.REACT_APP_STAKING_CONTRACT
    );
    let totalStaked = await contract.methods.totalStaked().call();
    return totalStaked;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default getTotalStaking;
