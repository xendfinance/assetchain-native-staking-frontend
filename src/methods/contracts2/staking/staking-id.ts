import createContract from "../web3Initiate";
import stakingAbi from "./abiManager/staking.json";
import retrieveAddress from "../../utils/retrieve-address";

async function stakingIds() {
  try {
    const ownerAddress = retrieveAddress();
    const contract = await createContract(
      stakingAbi,
      process.env.REACT_APP_STAKING_CONTRACT
    );
    let stakingIds = await contract.methods.getStakingIds(ownerAddress).call();
    return stakingIds;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default stakingIds;
