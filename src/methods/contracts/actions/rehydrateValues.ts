
import GetCategories from "./getCategories";
import GetTotalStaked from "./getTotalStaked";
import GetUserInfo from "./getUserInfo";
import GetUserStakedCategories from "./getUserStakedCategories";
import GetUserXendBalance from "./getUserXendBalance";


function Rehydrate(ownerAddress:any) {
    return async (dispatch: Function) => {
        
        try {
            dispatch(GetCategories());
            dispatch(GetTotalStaked());
            dispatch(GetUserInfo(ownerAddress));
            dispatch(GetUserStakedCategories(ownerAddress));
            dispatch(GetUserXendBalance(ownerAddress));
          
          
        } catch (err) {
           
           
        }
    };
}




export default Rehydrate;