import _const from "../actions/types";

const initialState = {
  theme: true,
  modalState: false,
  termsandconditions: false,
  stakeType: 0,
  amttoStake: "",
  stakeModal: 0,
  availableBalance: 0,
  hidenumbers: false,
  tokenAddress: "0x3096e7bfd0878cc65be71f8899bc4cfb57187ba3", //RWA token (Arbitrum)
  //tokenAddress: "0x41439f2dfb9d0c827e7316915C5a7A763b494785" CSS token
  infoModal: false,
  stakingpoints: false,
};

const GeneralReducer = (state = initialState, action) => {
  switch (action.type) {
    case _const.TOGGLE_THEME:
      return { ...state, theme: action.payload };

    case _const.TOGGLE_MODAL:
      return { ...state, modalState: action.payload };

    case _const.TOGGLE_STAKE_MODAL:
      return { ...state, stakeModal: action.payload };

    case _const.TERMS_AND_CONDITIONS:
      return { ...state, termsandconditions: action.payload };

    case _const.FILL_OUT_FORM:
      return {
        ...state,
        [action.payload.props]: action.payload.value
      };

    case _const.TOKEN_AVAILABLE_BALANCE:
      return { ...state, availableBalance: action.payload };

    case _const.CLEAR_DATA:
      return { ...state, amttoStake: 0, stakeType: 0 };

    default:
      return state;
  }
};

export default GeneralReducer;
