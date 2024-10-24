import createContract from "../web3Initiate";
import stakingAbi from "./abiManager/staking.json";

//Duration in seconds someone must wait after their last staking action
async function actionLimitTime() {
  try {
    const contract = await createContract(
      stakingAbi,
      process.env.REACT_APP_STAKING_CONTRACT
    );
    let limit = await contract.methods.actionLimit().call();
    return limit;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default actionLimitTime;
