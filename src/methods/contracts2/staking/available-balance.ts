import createContract from "../web3Initiate";
import erc20Abi from "./abiManager/erc20.json";
import retrieveAddress from "../../utils/retrieve-address";

async function availableBalance(tokenAddress: String) {
  try {
    const ownerAddress = retrieveAddress();
    const contract = await createContract(erc20Abi, tokenAddress);
    let available = await contract.methods.balanceOf(ownerAddress).call();
    return available;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default availableBalance;
