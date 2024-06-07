import _const from "./types";
import getTotalStaking from "../../contracts2/staking/total-staked";
import getUserStaking from "../../contracts2/staking/user-staked";
import estimatedRewards from "../../contracts2/staking/estimated-rewards";
import stakeToken from "../../contracts2/staking/stake-tokens";
import availableBalance from "../../contracts2/staking/available-balance";
import unstakeToken from "../../contracts2/staking/unstake-token";
import pendingRewards from "../../contracts2/staking/pending-rewards";
import claimRewards from "../../contracts2/staking/claim-rewards";
import stakingIds from "../../contracts2/staking/staking-id";
import stakingInfo from "../../contracts2/staking/staking-info";
import actionLimit from "../../contracts2/staking/action-limit";
import lockperiod from "../../contracts2/staking/lock-period";
import { staketogglemodal } from "./generalActions";
import retrieveAddress from "../../utils/retrieve-address";
import unLock from "../../contracts2/staking/force-unlock";

let fixedlockperiodenums = ["1", "2", "3", "4", 1, 2, 3, 4];
const ownerAddress = retrieveAddress();

export const getAllStaked = () => {
  return async (dispatch) => {
    const allStaked = await getTotalStaking();
    dispatch({
      type: _const.ALL_STAKED,
      payload: allStaked / Math.pow(10, 18),
    });
  };
};

export const getUserStaked = (address) => {
  return async (dispatch) => {
    const userStaked = await getUserStaking(address);
    dispatch({
      type: _const.USER_STAKED,
      payload: userStaked / Math.pow(10, 18),
    });
  };
};

export const getEstimatedRewards = () => {
  return async (dispatch) => {
    const rewards = await estimatedRewards();
    dispatch({
      type: _const.ESTIMATED_REWARDS,
      payload: rewards / 100,
    });
  };
};

export const stakeUserToken = (
  amt,
  lockperiod,
  termsandconditions,
  availableBalance,
  stakingPeriod
) => {
  return async (dispatch) => {
    const ownerAddress = retrieveAddress();
    if (!termsandconditions) {
      dispatch({
        type: _const.STAKING_TOKEN_FAILED,
        payload: "Kindly accept the terms to proceed",
      });
    } else if (amt === 0 || isNaN(amt)) {
      dispatch({
        type: _const.STAKING_TOKEN_FAILED,
        payload: "Please enter a valid amount",
      });
    } 
    else if (amt > availableBalance) {
      dispatch({
        type: _const.STAKING_TOKEN_FAILED,
        payload: "The amount cannot be greater than your available balance",
      });
    } 
    else if (fixedlockperiodenums.includes(stakingPeriod)) {
      dispatch({
        type: _const.STAKING_TOKEN_FAILED,
        payload:
          "You already have a fixed staked token on this account, wait to unstake before staking again or stake with another account.",
      });
    } else if (
      (stakingPeriod !== undefined) &&
      !fixedlockperiodenums.includes(stakingPeriod) &&
      fixedlockperiodenums.includes(lockperiod)
    ) {
      dispatch({
        type: _const.STAKING_TOKEN_FAILED,
        payload:
          "You are unable to have a fixed and flexible staking plan on the same account.",
      });
    } else {
      dispatch({
        type: _const.STAKING_TOKEN_FAILED,
        payload: "",
      });
      dispatch({
        type: _const.STAKING_TOKEN,
        payload: true,
      });

      const res = await stakeToken(amt, lockperiod);
      console.log(res, 'i am res')
      if (res) {
        dispatch({
          type: _const.STAKING_TOKEN,
          payload: false,
        });
        if (res.status) {
          dispatch({
            type: _const.STAKED_STATUS,
            payload: 1,
          });
          dispatch({
            type: _const.CLEAR_DATA,
            payload: true,
          });
          dispatch(staketogglemodal(3));
          dispatch(getAllStaked());
          dispatch(getAvailableBalance());
          dispatch(getUserStaked(ownerAddress));
          dispatch(getAllStakingIds());
        } else {
          dispatch({
            type: _const.STAKED_STATUS,
            payload: 1,
          });

          dispatch(staketogglemodal(4));
        }
      }

    }
  };
};

export const getAvailableBalance = () => {
  return async (dispatch) => {
    let balance = await availableBalance();
    dispatch({
      type: _const.TOKEN_AVAILABLE_BALANCE,
      payload: balance,
    });
  };
};

export const getPendingRewards = () => {
  return async (dispatch) => {
    let pendingReward = await pendingRewards();
    var rewards = pendingReward / Math.pow(10, 18);
    dispatch({
      type: _const.PENDING_REWARDS,
      payload: rewards,
    });
  };
};

export const claimUserRewards = (tokenAddress) => {
  return async (dispatch) => {
    dispatch({
      type: _const.CLAIMING_REWARDS,
      payload: true,
    });
    let res = await claimRewards();
    if (res) {
      dispatch({
        type: _const.CLAIMING_REWARDS,
        payload: false,
      });
    }
    if (res.status) {
      dispatch({
        type: _const.STAKED_STATUS,
        payload: 3,
      });
      dispatch(staketogglemodal(3));
      dispatch(getPendingRewards());
      dispatch(getAllStaked());
      dispatch(getAvailableBalance());
      dispatch(getAllStakingIds());
    } else {
      dispatch({
        type: _const.STAKED_STATUS,
        payload: 3,
      });
      dispatch(staketogglemodal(4));
    }
  };
};

export const unStakeAvailableToken = (
  stakingPeriod,
  timeLimit,
  period,
  lockperiod
) => {
  return async (dispatch) => {
    let currenttimeInSeconds = Math.floor(new Date().getTime() / 1000);
    let timeStakedInSeconds = Math.floor(
      new Date(Number(stakingPeriod)).getTime()
    );
    let diff = currenttimeInSeconds - timeStakedInSeconds;

    if (diff < timeLimit) {
      dispatch({
        type: _const.UNSTAKING_TOKEN_FAILED,
        payload: "Unstaking too much in a short period is not valid",
      });
    } else 
    if (diff < period) {
      dispatch({
        type: _const.UNSTAKING_TOKEN_FAILED,
        payload: "Can't unstake within minimum lock time",
      });
    } else if (lockperiod / 1000 > currenttimeInSeconds) {
      dispatch(staketogglemodal(7));
    } else {
      dispatch({
        type: _const.UNSTAKING_TOKEN,
        payload: true,
      });
      let res = await unstakeToken();
      if (res) {
        dispatch({
          type: _const.UNSTAKING_TOKEN,
          payload: false,
        });

        if (res.status) {
          dispatch({
            type: _const.STAKED_STATUS,
            payload: 2,
          });
          dispatch(staketogglemodal(3));
          dispatch(getAllStaked());
          dispatch(getAvailableBalance());
          dispatch(getUserStaked(ownerAddress));
        } else {
          dispatch({
            type: _const.STAKED_STATUS,
            payload: 2,
          });

          dispatch(staketogglemodal(4));
        }
      }
    }
  };
};

export const getAllStakingIds = () => {
  return async (dispatch) => {
    let ids = await stakingIds();
    let info = await stakingInfo(ids[ids.length - 1]);
    dispatch({
      type: _const.MY_STAKING_INFO,
      payload: info,
      ids,
    });
  };
};

export const getActionLimit = () => {
  return async (dispatch) => {
    let limit = await actionLimit();
    dispatch({
      type: _const.TIME_LIMIT,
      payload: limit,
    });
  };
};

export const getlockPeriod = () => {
  return async (dispatch) => {
    let period = await lockperiod();
    dispatch({
      type: _const.LOCK_PERIOD,
      payload: period,
    });
  };
};

export const forceUnlock = (stakingId, tokenAddress) => {
  return async (dispatch) => {
    dispatch({
      type: _const.UNSTAKING_TOKEN,
      payload: true,
    });
    let res = await unLock(stakingId);

    if (res) {
      dispatch({
        type: _const.UNSTAKING_TOKEN,
        payload: false,
      });

      if (res.status) {
        dispatch({
          type: _const.STAKED_STATUS,
          payload: 2,
        });
        dispatch(staketogglemodal(3));
        dispatch(getAllStaked());
        dispatch(getAvailableBalance());
        dispatch(getUserStaked(ownerAddress));
      } else {
        dispatch({
          type: _const.STAKED_STATUS,
          payload: 2,
        });

        dispatch(staketogglemodal(4));
      }
    }
  };
};

export const reStake = (tokenAddress) => {
  return async (dispatch) => {
    let staked = await dispatch(claimUserRewards(tokenAddress));
    if (staked) {
      dispatch(staketogglemodal(1));
    }
  };
};


export const clearError = () =>{
  return (dispatch) =>{
    dispatch({
      type: _const.STAKING_TOKEN_FAILED,
      payload: "",
    });
    dispatch({
      type:  _const.UNSTAKING_TOKEN_FAILED,
      payload: "",
    });
  }
}