import _const from "../actions/types";

const initialState = {
  allStaked: 0,
  userStaked: 0,
  rewards: 0,
  pendingUserRewards: 0,
  stakingFailedMsg: 0,
  unstakingFailedMsg: "",
  stakedStatus: 0,
  ids: [],
  timeLimit: 0,
  period: 0,
  stakingPeriod: { 1: 7776000, 2: 15552000, 3: 23328000, 4: 31104000 },
};

const StakingReducer = (state = initialState, action) => {
  switch (action.type) {
    case _const.ALL_STAKED:
      return { ...state, allStaked: action.payload };

    case _const.USER_STAKED:
      return { ...state, userStaked: action.payload };

    case _const.ESTIMATED_REWARDS:
      return { ...state, rewards: action.payload };

    case _const.PENDING_REWARDS:
      return { ...state, pendingUserRewards: action.payload };

    case _const.STAKING_TOKEN_FAILED:
      return { ...state, stakingFailedMsg: action.payload };

    case _const.UNSTAKING_TOKEN_FAILED:
      return { ...state, unstakingFailedMsg: action.payload };

    case _const.STAKED_STATUS:
      return { ...state, stakedStatus: action.payload };

    case _const.MY_STAKING_INFO:
      return { ...state, stakingInfo: action.payload, ids: action.ids };

    case _const.TIME_LIMIT:
      return { ...state, timeLimit: action.payload };

    case _const.LOCK_PERIOD:
      return { ...state, period: action.payload };

    default:
      return state;
  }
};

export default StakingReducer;
