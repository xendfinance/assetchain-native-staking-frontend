import abiManager from "abiManager";
import moment from "moment";
import Web3 from "web3";
import createContract from "../contract-creator";

async function GetUserStakedCategoryHasWithdrawn(categoryId:any) {
    try {
       
        const stakingContract = await createContract(abiManager.XSTAKING, "0x3d4D0699C4Df1539Fdc42C6F9594A478c6929051");
      
        return await stakingContract.methods.getTokenLockStatus(categoryId).call();
        
    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

export default GetUserStakedCategoryHasWithdrawn;