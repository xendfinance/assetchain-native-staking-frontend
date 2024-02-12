import _const from "../../_const";

type Action = {
  type: string;
  payload: any;
};

const initialState = {
  address: "",
  walletInUse: "",
  chainId: 0,
  nativeBalance: "0.00",
  apys: [],
  signature: ""
};

const ConnectWalletReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case _const.ADDRESS:
      return {
        ...state,
        ...action.payload
      };

    case _const.SIGNATURE:
      return {
        ...state,
        signature: action.payload
      };
    case _const.NATIVE_BALANCE:
      return { ...state, nativeBalance: action.payload };
    case _const.PRISTINE:
      return { ...state, address: "", nativeBalance: "0.0000" };

    case _const.APYS:
      return { ...state, apys: action.payload };

    default:
      return state;
  }
};

export default ConnectWalletReducer;
