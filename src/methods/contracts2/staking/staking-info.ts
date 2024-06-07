import createContract from "../web3Initiate";
import stakingAbi from "./abiManager/staking.json";

//This gets the staking information for a particular staking id
//{0: walletAddress, 1: amountStaked, 2: Time from last locktime, 3: '0'}
async function stakingInfo(id) {
  try {
    const contract = await createContract(
      stakingAbi,
      process.env.REACT_APP_STAKING_CONTRACT
    );
    let stakingInfo = await contract.methods.getStakingInfo(id).call();
    return stakingInfo;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default stakingInfo;
