import createContract from "../contract-creator";
import stakingAbi from "./abiManager/staking.json";
import retrieveAddress from "../../utils/retrieve-address";
import getFastGasFeeMatic from "../gas-fee";

async function stakeToken(amt: any, lockperiod: Number) {
  try {
    const ownerAddress = retrieveAddress();
    let gasFee = await getFastGasFeeMatic();

    const contract = await createContract(
      stakingAbi,
      process.env.REACT_APP_STAKING_CONTRACT
    );
    let staked = await contract.methods
      .stake(String(amt), lockperiod)
      .send({ from: ownerAddress, gasPrice: gasFee });
    return staked;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default stakeToken;
