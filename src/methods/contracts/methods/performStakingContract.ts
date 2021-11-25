import abiManager from "abiManager";
import createContract from "../contract-creator";
import Web3 from "web3";
import Notify from 'bnc-notify';
import { notification } from "antd";

interface IStakeAsset {
	amount: any
	period:any
    client:any
}

export const PerformStakingIntoProtocol = async ({
	amount,
	period,
    client
	}: IStakeAsset) => {

	try {

		let notifyBNC = Notify({
			dappId: getDappId(97),
			networkId: 97,
			mobilePosition: 'bottom',
			desktopPosition: 'bottomRight'
		})

        const xendContract = await createContract(abiManager.XENDToken, "0xA86A8b07f4059b4509C80Be1885EBb4FD8a2ac4b");
        const stakingContract = await createContract(abiManager.XSTAKING, "0x4150f98C94BA89Ac78eC28131Be6a0c1B41224E2");
        console.log("TEST HIT HERE ")
		// approve
		await xendContract.methods['approve']('0x4150f98C94BA89Ac78eC28131Be6a0c1B41224E2', formatAmount(amount,97))
			.send({ from: client })
			.on('transactionHash', hash => {
                console.log("TEST HIT HERE HASH APPROVE ",hash)
				//notifyBNC.hash(hash)
                // notification['info']({
                //     message: 'Approve Transaction Sent 😜',
                //     description: hash,
                //     placement:"bottomRight",
                //     duration:15,
                //     onClick: () =>
                //     window.open(("https://testnet.bscscan.com/tx/")+hash),
                //   });
			})

		// deposit
		return await stakingContract.methods['stakeToken'](formatAmount(amount, 97),period)
			.send({ from: client })
			.on('transactionHash', hash => {
                console.log("TEST HIT HERE HASH STAKE ",hash)
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

export const formatAmount = (
	amount: any,
	network: number
	) => {

	if (network == 56) {
		return Web3.utils.toWei(amount, 'ether');
	} else if (network == 97) {

		return Web3.utils.toWei(amount, 'ether');
	} 
    else return amount;

}

export const getDappId = (network: number) => {
	switch (network) {
		case 56: return 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a';
		case 97: return 'a7f90c48-943a-4d3a-a8df-6ca5d0f7522a';
		default: return '';
	}
}


export default PerformStakingIntoProtocol;