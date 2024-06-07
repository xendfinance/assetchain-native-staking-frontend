import createContract from "../contract-creator";
import stakingAbi from "./abiManager/staking.json";
import retrieveAddress from "../../utils/retrieve-address";
import web3 from "web3"

async function stakeToken(amt: any, lockperiod: Number) {
  try {
    const ownerAddress = retrieveAddress();
    let amountToStake = web3.utils.toWei(amt, 'ether'); 
    const contract = await createContract(
      stakingAbi,
      process.env.REACT_APP_STAKING_CONTRACT
    );
    let staked = await contract.methods
      .stake(lockperiod)
      .send({ from: ownerAddress, value: amountToStake});
    return staked;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default stakeToken;
