import { notify } from "components/core/Notifier";
import _const from "methods/_const";
import PerformStakingIntoProtocol from "../methods/performStakingContract";
import Rehydrate from "./rehydrateValues";
import { notification } from "antd";



interface IStakeAsset {
	amount: any,
	period:any,
    client:any
}

function PerformStaking(data:IStakeAsset) {
    return async (dispatch: Function) => {
        
        try {
            dispatch({
                type: _const.LOADINGDATA,
                payload: true
            })
            const response = await PerformStakingIntoProtocol(data);
            const properties = Object.keys(response);
        
			if (properties.includes('status') && response.status) {
				dispatch(Rehydrate(data.client));
                notification['success']({
                    message: 'Staking Funds Successful',
                    description: "The amount of " +data.amount+" XEND been staked",
                    placement:"bottomRight",
                    duration:5,
                   
                  });
               
			}else{
                dispatch({
                    type: _const.LOADINGDATA,
                    payload: false
                })
                notification['error']({
                    message: 'Staking Funds Unsuccessful',
                    description: "The amount of " +data.amount+" XEND has not been staked",
                    placement:"bottomRight",
                    duration:5,
                   
                  });
            }
            
          
			if (response.message == 'User rejected the transaction' || response.message == 'User canceled' || response.message == 'MetaMask Tx Signature: User denied transaction signature.') {
                dispatch({
                    type: _const.LOADINGDATA,
                    payload: false
                })
                notification['error']({
                    message: 'User Has Rejected Transaction',
                    description: "The amount of " +data.amount+" XEND has not been staked",
                    placement:"bottomRight",
                    duration:5,
                   
                  });
			}

          
        } catch (err) {
            console.error(err);
           
        }
    };
}

export default PerformStaking;