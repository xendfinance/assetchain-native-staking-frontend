import { notification } from "antd";
import { notify } from "components/core/Notifier";
import _const from "methods/_const";
import PerformStakingIntoProtocol from "../methods/performStakingContract";
import PerformWithdrawProtocol from "../methods/performWithdrawContract";
import Rehydrate from "./rehydrateValues";



interface IWithdrawAsset {
	categoryId: any,
    client:any
}

function PerformWithdraw(data:IWithdrawAsset) {
    return async (dispatch: Function) => {
        
        try {
            dispatch({
                type: _const.LOADINGDATA,
                payload: true
            })
            const response = await PerformWithdrawProtocol(data);
            const properties = Object.keys(response);

			if (properties.includes('status') && response.status) {
				dispatch(Rehydrate(data.client));
                notification['success']({
                    message: 'Withdraw Staked Funds',
                    description: "Withdraw of staked funds successful",
                    placement:"bottomRight",
                    duration:5,
                   
                  });
            }else{
                dispatch({
                    type: _const.LOADINGDATA,
                    payload: false
                })
                notification['error']({
                    message: 'Withdraw Staked Funds',
                    description: "Withdraw of staked funds unsuccessful",
                    placement:"bottomRight",
                    duration:5,
                   
                  });
            }
			


			if (response.message == 'User rejected the transaction' || response.message == 'User canceled' ||response.message == 'MetaMask Tx Signature: User denied transaction signature.') {
				
                dispatch({
                    type: _const.LOADINGDATA,
                    payload: false
                })
                
                notification['error']({
                    message: 'User Has Rejected Transaction',
                    description: "The staked XEND has not been withdrawn",
                    placement:"bottomRight",
                    duration:5,
                   
                  });
			}

          
        } catch (err) {
            console.error(err);
           
        }
    };
}

export default PerformWithdraw;