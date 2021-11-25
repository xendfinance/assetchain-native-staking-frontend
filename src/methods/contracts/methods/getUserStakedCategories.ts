import abiManager from "abiManager";
import createContract from "../contract-creator";

async function GetUserStakedCategoriesFromContract(ownerAddress:any) {
    try {
       
        const stakingContract = await createContract(abiManager.XSTAKING, "0x4150f98C94BA89Ac78eC28131Be6a0c1B41224E2");
      
        return  await stakingContract.methods.getTokenStakingIdByAddress(ownerAddress).call();

    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

export default GetUserStakedCategoriesFromContract;