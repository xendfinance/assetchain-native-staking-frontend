import _const from "methods/_const";
import balanceFormatter from "../balanceFormatter";
import GetUserInfoFromContract from "../methods/getUserInfoFromContract";
import GetUserXendBalanceFromContract from "../methods/getUserXendBalanceFromContract";


function GetUserXendBalance(ownerAddress:any) {
    return async (dispatch: Function) => {
        
        try {
           
            const response = await GetUserXendBalanceFromContract(ownerAddress);
            const formattedRes = await balanceFormatter(response)
           
           
            dispatch({
                type: _const.XEND_BALANCE,
                payload: formattedRes
            })
          
        } catch (err) {
           
           
        }
    };
}

export default GetUserXendBalance;