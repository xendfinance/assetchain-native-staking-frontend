import abiManager from "abiManager";
import createContract from "../contract-creator";
import Notify from 'bnc-notify';


interface IWithdrawAsset {
	categoryId: any,
    client:any
}

export const PerformWithdrawProtocol = async ({
	categoryId,
    client
	}: IWithdrawAsset) => {

	try {

		let notifyBNC = Notify({
			dappId: getDappId(97),
			networkId: 97,
			mobilePosition: 'bottom',
			desktopPosition: 'bottomRight'
		})

      
        const stakingContract = await createContract(abiManager.XSTAKING, "0x4150f98C94BA89Ac78eC28131Be6a0c1B41224E2");
      
		// deposit
		return await stakingContract.methods['withdrawStakedTokens'](categoryId)
			.send({ from: client })
			.on('transactionHash', hash => {
                console.log("TEST HIT Withdraw STAKE ",hash)
				//notifyBNC.hash(hash)
                // notification['info']({
                //     message: 'Staking Transaction Sent 😜',
                //     description: hash,
                //     placement:"bottomRight",
                //     duration:15,
                //     onClick: () =>
                //     window.open(("https://testnet.bscscan.com/tx/")+hash),
                //   });
			})


	} catch (e: any) {
		console.error(e);
		return { status: false, message: e.message }
	}
}



export const getDappId = (network: number) => {
	switch (network) {
		case 56: return 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a';
		case 97: return 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a';
		default: return '';
	}
}


export default PerformWithdrawProtocol;