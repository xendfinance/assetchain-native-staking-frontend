import _const from "./types";
import axios from "axios";
import Web3 from "web3";


export const getMarketQuote = () => {
  return dispatch => {
    axios
      .get(`${process.env.REACT_APP_TOKEN_PRICE}`)
      .then(res => {
        dispatch({
          type: _const.MARKET_QUOTE,
          payload: res.data.data
        });
      })
      .catch(err => {
        console.log(err, "i am the err");
      });
  };
};

export const getStakingScore = address => {
  // console.log(address, 'scorejsdkj')
  return dispatch => {
    axios
      .get(`${process.env.REACT_APP_STAKING_SCORE_URL}${Web3.utils.toChecksumAddress(address)}`)
      .then(res => {
        dispatch({
          type: _const.STAKING_SCORE,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err, "i am the err");
      });
  };
};
