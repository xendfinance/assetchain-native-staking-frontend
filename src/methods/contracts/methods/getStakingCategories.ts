import abiManager from "abiManager";
import createContractPreConnect from "../contract-creator-pre-connect";

async function GetStakingCategories() {
    try {
        //const stakingContract = await createContractPreConnect(abiManager.XSTAKING, process.env.STKADDRESS);
        const stakingContract = await createContractPreConnect(abiManager.XSTAKING, "0x4150f98C94BA89Ac78eC28131Be6a0c1B41224E2");

        console.log("METHODS CONTRACTS",stakingContract);
        return  await stakingContract.methods.getCategories().call();

    } catch (err :any) {
        console.log(err);
        return {
            status: false,
            message: err.message
        };
    }
}

export default GetStakingCategories;