import _const from "../actions/types";

const initialState = {
  usdQuote: 0,
  circulatingSupply: 0,
  stakingScore: 0
};

const MarketReducer = (state = initialState, action) => {
  switch (action.type) {
    case _const.MARKET_QUOTE:
      return {
        ...state,
        usdQuote: action.payload.usdQuote,
        circulatingSupply: action.payload.circulatingSupply
      };

    case _const.STAKING_SCORE:
      return { ...state, stakingScore: action.payload/1000};

    default:
      return state;
  }
};

export default MarketReducer;
