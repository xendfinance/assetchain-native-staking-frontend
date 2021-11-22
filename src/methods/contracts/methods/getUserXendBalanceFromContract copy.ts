import abiManager from "abiManager";
import createContract from "../contract-creator";

async function GetUserXendBalanceFromContract(ownerAddress:any) {
    try {
        //const stakingContract = await createContractPreConnect(abiManager.XSTAKING, process.env.STKADDRESS);
        const xendContract = await createContract(abiManager.XENDToken, "0xA86A8b07f4059b4509C80Be1885EBb4FD8a2ac4b");
      
        return  await xendContract.methods.balanceOf(ownerAddress).call();

    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

export default GetUserXendBalanceFromContract;