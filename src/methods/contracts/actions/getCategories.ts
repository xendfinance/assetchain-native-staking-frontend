import _const from "methods/_const";
import Web3 from "web3";
import balanceFormatterCategories from "../balanceFormatterCategories";
import GetCategoryTotalTokensStaked from "../methods/getCategoryTotalTokensStaked";
import GetStakingCategories from "../methods/getStakingCategories";


function GetCategories() {
    return async (dispatch: Function) => {
        
        try {
           
            const response = await GetStakingCategories();
            let finalState: Array<any> = [];
           
            for (let i = 0; i < response.length; i++) {
                let category = response[i];
                let apy = ((category[3] * 365)/(category[1] * 100000))*100;
                
                let limit = Web3.utils.fromWei(category[5].toString(), 'ether');
                let limitFormatted = await balanceFormatterCategories(limit)
                
                let totalStakedInCategory = await  GetCategoryTotalTokensStaked(Number(category[1]))
                let totalStakedInCategoryFormatted = await balanceFormatterCategories(totalStakedInCategory)

                finalState.push({
                   id:i,
                   name:category[0],
                   period:category[1],
                   withdrawTime:category[2],
                   tokenRewardPercent:category[3],
                   tokenPenaltyPercent:category[4],
                   limit:limitFormatted,
                   totalStakedInCategory:totalStakedInCategoryFormatted,
                   apy:Math.round(apy)
               })
            }

            

            localStorage.setItem("CATEGORIES_PROTOCOL", JSON.stringify(finalState))
           
            dispatch({
                type: _const.CATEGORIES,
                payload: finalState
            })
          
        } catch (err) {
           
           
        }
    };
}

export default GetCategories;