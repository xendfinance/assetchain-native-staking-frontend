import abiManager from "abiManager";
import moment from "moment";
import createContract from "../contract-creator";

async function GetUserStakedCategoriesEndTime(categoryId:any) {
    try {
       
        const stakingContract = await createContract(abiManager.XSTAKING, "0x3d4D0699C4Df1539Fdc42C6F9594A478c6929051");
      
        const res = await stakingContract.methods.getTokenStakingEndTimeById(categoryId).call();
        return moment.unix(res).format("YYYY-MM-DD HH:mm");
       

    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

export default GetUserStakedCategoriesEndTime;