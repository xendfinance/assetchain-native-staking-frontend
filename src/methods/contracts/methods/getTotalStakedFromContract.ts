import abiManager from "abiManager";
import createContractPreConnect from "../contract-creator-pre-connect";

async function GetTotalStakedFromContract() {
    try {
       
        const xendContract = await createContractPreConnect(abiManager.XSTAKING, "0x4150f98C94BA89Ac78eC28131Be6a0c1B41224E2");
      
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