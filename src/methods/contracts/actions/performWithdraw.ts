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
           
            const response = await PerformWithdrawProtocol(data);
            const properties = Object.keys(response);

			if (properties.includes('status') && response.status) {
				dispatch(Rehydrate(data.client));
			} else {
				
			}


			if (response.message == 'User rejected the transaction' || response.message == 'User canceled') {
				
			}

          
        } catch (err) {
            console.error(err);
           
        }
    };
}

export default PerformWithdraw;