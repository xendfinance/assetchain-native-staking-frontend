import _const from "methods/_const";
import GetStakingCategories from "../methods/getStakingCategories";


function GetCategories() {
    return async (dispatch: Function) => {
        
        try {
           
           
            const response = await GetStakingCategories();
           
           
            dispatch({
                type: _const.CATEGORIES,
                payload: [response]
            })


            const arrayOfResProperties = Object.keys(response);
           
            // if (arrayOfResProperties.includes('status') && response.status) {
              

            //     dispatch(getAllBalances(addressOwner,chainId));
               
            // } else {
            //     notify('error', 'Something went wrong');
            // }
            // if(response.message == 'User rejected the transaction' || response.message == 'User canceled'){
            //     notify('error', 'Transaction Rejected');
            // }
          
        } catch (err) {
           
           
        }
    };
}

export default GetCategories;