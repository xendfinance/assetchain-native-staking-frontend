
import reduxStore from "methods/redux";
import _const from "methods/_const";
import moment from "moment";
import { useSelector } from "react-redux";
import GetUserStakedCategoriesFromContract from "../methods/getUserStakedCategories";
import GetUserStakedCategoriesEndTime from "../methods/getUserStakedCategoryEndTime";
import GetUserStakedCategoryHasWithdrawn from "../methods/getUserStakedCategoryHasWithdrawn";
import GetUserStakedCategoryPeriod from "../methods/getUserStakedCategoryPeriod";
import GetUserStakedCategoriesRewardTokens from "../methods/getUserStakedCategoryRewardTokens";
import GetUserStakedCategoriesStartTime from "../methods/getUserStakedCategoryStartTime";
import GetUserStakedCategoriesTotalTokens from "../methods/getUserStakedCategoryTotalTokens";
import GetUserStakedCategoriesTotalTokensWithdrawn from "../methods/getUserStakedCategoryTotalTokensWithdrawn";


function GetUserStakedCategories(ownerAddress:any) {
    return async (dispatch: Function) => {
        
        try {
            dispatch({
                type: _const.LOADINGDATA,
                payload: true
            })

            const categories = JSON.parse(localStorage.getItem("CATEGORIES_PROTOCOL"));

            if(categories.length > 1){
            
                const response = await GetUserStakedCategoriesFromContract(ownerAddress);
                let finalState: Array<any> = [];
                let finalStateWithdraw: Array<any> = [];
                for (let i = 0; i < response.length; i++) {
                    let category = response[i];
                    let startTime = await GetUserStakedCategoriesStartTime(category);
                    let endTime = await GetUserStakedCategoriesEndTime(category);
                    let totalStakedTokens = await GetUserStakedCategoriesTotalTokens(category);
                    let totalRewardTokens = await GetUserStakedCategoriesRewardTokens(category);
                    let period = await GetUserStakedCategoryPeriod(category);
                    let apy;
                    let name;
                    let minimumWithdrawalDate;
    
                    for(let i = 0; i < categories.length; i++){
                        let protocolCategory = categories[i];
                        let minmumWithdrawalDate = moment(startTime).add(protocolCategory.withdrawTime, 'seconds').format('YYYY-MM-DD HH:mm');
    
                        if(protocolCategory.period == period ){
                            apy = protocolCategory.apy;
                            name = protocolCategory.name;
                            minimumWithdrawalDate = minmumWithdrawalDate;
                        }
                    }

                    let hasWithdrawn = await GetUserStakedCategoryHasWithdrawn(category)

                    if(hasWithdrawn){
                        let totalWithdrawn =  await GetUserStakedCategoriesTotalTokensWithdrawn(category)
                        finalStateWithdraw.push({
                            id:category,                          
                            StakedTokens:totalStakedTokens,
                            RewardTokens:totalRewardTokens,
                            TotalDays:period,
                            Name:name,
                            APR:apy,
                            TotalWithdrawal:totalWithdrawn
                        })
                    }else{
                        finalState.push({
                            id:category,
                            MinimumWithdrawalDate:minimumWithdrawalDate,
                            StartDate:startTime,
                            EndDate:endTime,
                            StakedTokens:totalStakedTokens,
                            RewardTokens:totalRewardTokens,
                            TotalDays:period,
                            Name:name,
                            APR:apy
                        })
                    }

                    dispatch({
                        type: _const.USER_CATEGORIES,
                        payload: finalState
                    })
    
                    dispatch({
                        type: _const.USER_CATEGORIES_WITHDRAW,
                        payload: finalStateWithdraw
                    })
                }
           
             
             
            }

            dispatch({
                type: _const.LOADINGDATA,
                payload: false
            })
          
        } catch (err) {
           
           
        }
    };
}

// export const getUSDXENDValue = async (
// 	amount: any,
// 	currentPrice: number
// 	) => {

//     const FinalBalance = Web3.utils.fromWei(amount.toString(), 'ether');

//     const USDResultXEND = await balanceFormatterXEND(Number(FinalBalance) * currentPrice);
//     return USDResultXEND;

// }


export default GetUserStakedCategories;