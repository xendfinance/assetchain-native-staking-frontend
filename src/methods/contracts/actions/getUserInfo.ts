import { getCoinGeckoPrice } from "methods/utils/get-xend-usd-price";
import _const from "methods/_const";
import Web3 from "web3";
import balanceFormatter from "../balanceFormatter";
import balanceFormatterXEND from "../balanceFormatterXEND";
import GetUserInfoFromContract from "../methods/getUserInfoFromContract";


function GetUserInfo(ownerAddress:any) {
    return async (dispatch: Function) => {
        
        try {
           
            const response = await GetUserInfoFromContract(ownerAddress);
            
            let xendUsdPrice = await getCoinGeckoPrice("xend-finance");
           
            let XENDPriceCurrent = parseFloat(xendUsdPrice); 
            
        
            let userInfo = {
                staked: await balanceFormatter(response.staked),
                stakedUSD:await getUSDXENDValue(response.staked,XENDPriceCurrent),
                earned: await balanceFormatter(response.earned),
                earnedUSD:await getUSDXENDValue(response.earned,XENDPriceCurrent),
                reward: await balanceFormatter(response.reward),
                rewardUSD:await getUSDXENDValue(response.reward,XENDPriceCurrent),
            };
               
         
            dispatch({
                type: _const.USER_INFO,
                payload: userInfo
            })
          
        } catch (err) {
           
           
        }
    };
}

export const getUSDXENDValue = async (
	amount: any,
	currentPrice: number
	) => {

    const FinalBalance = Web3.utils.fromWei(amount.toString(), 'ether');

    const USDResultXEND = await balanceFormatterXEND(Number(FinalBalance) * currentPrice);
    return USDResultXEND;

}


export default GetUserInfo;