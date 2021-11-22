import _const from "methods/_const";
import GetStakingCategories from "../methods/getStakingCategories";


function GetCategories() {
    return async (dispatch: Function) => {
        
        try {
           
            const response = await GetStakingCategories();
            let finalState: Array<any> = [];
            for (let i = 0; i < response.length; i++) {
                let category = response[i];
                let apy = ((category[3] * 365)/(category[1] * 100000))*100;
                finalState.push({
                   id:i,
                   name:category[0],
                   period:category[1],
                   withdrawTime:category[2],
                   tokenRewardPercent:category[3],
                   tokenPenaltyPercent:category[4],
                   limit:category[5],
                   apy:Math.round(apy)
               })
            }
           
            dispatch({
                type: _const.CATEGORIES,
                payload: finalState
            })
          
        } catch (err) {
           
           
        }
    };
}

export default GetCategories;