import { notify } from "components/core/Notifier";
import _const from "methods/_const";
import PerformStakingIntoProtocol from "../methods/performStakingContract";



interface IStakeAsset {
	amount: any,
	period:any,
    client:any
}

function PerformStaking(data:IStakeAsset) {
    return async (dispatch: Function) => {
        
        try {
            notify('error', 'Something went wrong')
            const response = await PerformStakingIntoProtocol(data);
            const properties = Object.keys(response);

			if (properties.includes('status') && response.status) {
				
			} else {
				
			}


			if (response.message == 'User rejected the transaction' || response.message == 'User canceled') {
				
			}

          
        } catch (err) {
            console.error(err);
           
        }
    };
}

export default PerformStaking;