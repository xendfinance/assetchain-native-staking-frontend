import abiManager from "abiManager";
import createContract from "../contract-creator";

async function GetUserXendBalanceFromContract(ownerAddress:any) {
    try {
        //const stakingContract = await createContractPreConnect(abiManager.XSTAKING, process.env.STKADDRESS);
        const xendContract = await createContract(abiManager.XENDToken, "0x4a080377f83D669D7bB83B3184a8A5E61B500608");
      
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