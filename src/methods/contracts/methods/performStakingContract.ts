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

		// let notifyBNC = Notify({
		// 	dappId: getDappId(56),
		// 	networkId: 56,
		// 	mobilePosition: 'bottom',
		// 	desktopPosition: 'bottomRight'
		// })


        const xendContract = await createContract(abiManager.XENDToken, "0x4a080377f83D669D7bB83B3184a8A5E61B500608");
        const stakingContract = await createContract(abiManager.XSTAKING, "0x3d4D0699C4Df1539Fdc42C6F9594A478c6929051");
      
		// approve
		await xendContract.methods['approve']('0x3d4D0699C4Df1539Fdc42C6F9594A478c6929051', formatAmount(amount,56))
			.send({ from: client })
			.on('transactionHash', hash => {
               
				//notifyBNC.hash(hash)
				
                notification['info']({
                    message: 'Approve Transaction Sent Successfully',
                    description: hash,
                    placement:"bottomRight",
					style:{cursor:"pointer"},
                    duration:15,
                    onClick: () =>
                    window.open(("https://bscscan.com/tx/")+hash),
                  });
			})

		// deposit
		return await stakingContract.methods['stakeToken'](formatAmount(amount, 56),period)
			.send({ from: client })
			.on('transactionHash', hash => {
              
				//notifyBNC.hash(hash)
                notification['info']({
                    message: 'Staking Transaction Sent Successfully',
                    description: hash,
					style:{cursor:"pointer"},
                    placement:"bottomRight",
                    duration:15,
                    onClick: () =>
                    window.open(("https://bscscan.com/tx/")+hash),
                  });
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
		case 56: return 'ae017221-0b8d-43dc-b50a-4a7bc688063e';
		case 97: return 'ae017221-0b8d-43dc-b50a-4a7bc688063e';
		default: return '';
	}
}


export default PerformStakingIntoProtocol;