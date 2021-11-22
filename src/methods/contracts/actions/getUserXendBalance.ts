import _const from "methods/_const";
import GetUserInfoFromContract from "../methods/getUserInfoFromContract";
import GetUserXendBalanceFromContract from "../methods/getUserXendBalanceFromContract copy";


function GetUserXendBalance(ownerAddress:any) {
    return async (dispatch: Function) => {
        
        try {
           
            const response = await GetUserXendBalanceFromContract(ownerAddress);
            console.log("response balance is",response)
         
            dispatch({
                type: _const.XEND_BALANCE,
                payload: response
            })
          
        } catch (err) {
           
           
        }
    };
}

export default GetUserXendBalance;