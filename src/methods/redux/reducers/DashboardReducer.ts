import _const from '../../_const';

type Action = {
    type: string;
    payload: any;
};

const initialState = {
    address: '',    
    chainId: 0,
    nativeBalance: '0.00',
    connectionDetails:[],
    networkConnect:'97',
    categories:[],
    userInfo:{}   
};

const DashboardReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case _const.ADDRESS:
            return { ...state, ...action.payload };
        case _const.NATIVE_BALANCE:
            return { ...state, nativeBalance: action.payload };
        case _const.PRISTINE:
            return { ...state, address: '', nativeBalance: '0.0000' };      
      
        case _const.WALLETINUSE:
            return { ...state, walletInUse: action.payload };
        case _const.CATEGORIES:
                return { ...state, categories: action.payload };
        case _const.USER_INFO:
            return { ...state, userInfo: action.payload };
        case _const.CONNDETAILS:
            return { ...state, connectionDetails: action.payload };
       case _const.NETWORK_CONNECT:
                return { ...state, networkConnect: action.payload }

        case _const.CONWALLETADD:
            return { ...state, wca: action.payload }
              
        default:
            return state;
    }
};



export default DashboardReducer;
