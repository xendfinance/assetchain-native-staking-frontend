import _const from "../actions/types";

const initialState = {
  stakingToken: false,
  unstakingToken: false,
  claimingRewards: false
};

const LoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case _const.STAKING_TOKEN:
      return { ...state, stakingToken: action.payload };

    case _const.UNSTAKING_TOKEN:
      return { ...state, unstakingToken: action.payload };

    case _const.CLAIMING_REWARDS:
      return { ...state, claimingRewards: action.payload };

    default:
      return state;
  }
};

export default LoaderReducer;
