import _const from '../../_const';

type Action = {
    type: string;
    payload: any;
};

const initialState = {
    address: '',    
    chainId: 0,
    nativeBalance: '0.00',
    xendBalance: '0.00',
    totalStakedContract: '0.00',
    totalStakedUSD: '0.00',
    connectionDetails:[],
    networkConnect:'56',
    categories:[],
    userCategories:[],
    userCategoriesWithdraw:[],
    userInfo:{},
    loadingData:false ,
    loadingDataReward:false ,
    summedRewardsUserInfo:{rewardsTokensSummed:'0.00',
                          rewardsTokensSummedUSD:'0.00'}  
};

const DashboardReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case _const.ADDRESS:
            return { ...state, ...action.payload };
        case _const.LOADINGDATA:
        return { ...state, loadingData:action.payload };
        case _const.LOADINGDATAREWARD:
            return { ...state, loadingDataReward:action.payload };
        case _const.NATIVE_BALANCE:
            return { ...state, nativeBalance: action.payload };
        case _const.XEND_BALANCE:
            return { ...state, xendBalance: action.payload };
        case _const.TOTAL_STAKED_CONTRACT:
            return { ...state, totalStakedContract: action.payload };
        case _const.TOTAL_STAKED_CONTRACT_USD:
            return { ...state, totalStakedUSD: action.payload };
        case _const.PRISTINE:
            return { ...state, address: '', nativeBalance: '0.0000' };      
      
        case _const.WALLETINUSE:
            return { ...state, walletInUse: action.payload };
        case _const.CATEGORIES:
                return { ...state, categories: action.payload };
        case _const.USER_CATEGORIES:
            return { ...state, userCategories: action.payload };
        case _const.USER_CATEGORIES_WITHDRAW:
            return { ...state, userCategoriesWithdraw: action.payload };
        case _const.USER_INFO:
            return { ...state, userInfo: action.payload };
        case _const.USER_REWARDS_SUMMED:
            return { ...state, summedRewardsUserInfo: action.payload };
        case _const.CONNDETAILS:
            return { ...state, connectionDetails: action.payload };
       case _const.NETWORK_CONNECT:
                return { ...state, networkConnect: action.payload }

              
        default:
            return state;
    }
};



export default DashboardReducer;
