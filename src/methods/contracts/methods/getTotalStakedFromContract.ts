import abiManager from "abiManager";
import createContractPreConnect from "../contract-creator-pre-connect";

async function GetTotalStakedFromContract() {
    try {
       
        const xendContract = await createContractPreConnect(abiManager.XSTAKING, "0x3d4D0699C4Df1539Fdc42C6F9594A478c6929051");
      
        return  await xendContract.methods.totalStakedToken().call();

    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

export default GetTotalStakedFromContract;