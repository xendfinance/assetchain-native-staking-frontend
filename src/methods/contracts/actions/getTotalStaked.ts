import { getCoinGeckoPrice } from "methods/utils/get-xend-usd-price";
import _const from "methods/_const";
import balanceFormatter from "../balanceFormatter";
import balanceFormatterXEND from "../balanceFormatterXEND";
import GetTotalStakedFromContract from "../methods/getTotalStakedFromContract";
import Web3 from "web3";



function GetTotalStaked() {
    return async (dispatch: Function) => {
        
        try {
           
            const response = await GetTotalStakedFromContract();
         
            let xendUsdPrice = await getCoinGeckoPrice("xend-finance");
           
            let XENDPriceCurrent = parseFloat(xendUsdPrice); 
            const FinalBalance = Web3.utils.fromWei(response.toString(), 'ether');

            const USDResultXEND = await balanceFormatterXEND(Number(FinalBalance) * XENDPriceCurrent);
            const formattedRes = await balanceFormatter(response)
           
           
            dispatch({
                type: _const.TOTAL_STAKED_CONTRACT,
                payload: formattedRes
            })

            dispatch({
                type: _const.TOTAL_STAKED_CONTRACT_USD,
                payload: USDResultXEND
            })
          
        } catch (err) {
           
           
        }
    };
}

export default GetTotalStaked;