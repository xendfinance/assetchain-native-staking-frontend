import _const from "methods/_const";
import GetUserInfoFromContract from "../methods/getUserInfoFromContract";


function GetUserInfo(ownerAddress:any) {
    return async (dispatch: Function) => {
        
        try {
           
            const response = await GetUserInfoFromContract(ownerAddress);
           
        
            let userInfo = {
                staked:response.staked,
                earned:response.earned,
                reward:response.reward,
            };
               
         
            dispatch({
                type: _const.USER_INFO,
                payload: userInfo
            })
          
        } catch (err) {
           
           
        }
    };
}

export default GetUserInfo;