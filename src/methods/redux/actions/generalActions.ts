import _const from "./types";

//Toggle Light Mode Switch
export const togglethemeswitch = (payload: Boolean) => {
  localStorage.setItem("userthemeswitch", JSON.stringify(payload));
  return {
    type: _const.TOGGLE_THEME,
    payload
  };
};

//Toggle Mobile Button
export const toggleMobileButton = (payload: Boolean) => {
  return {
    type: _const.TOGGLE_BUTTON,
    payload
  };
};

//Reinitialize the application
export const reinitializeApp = () => {
  let theme = localStorage.getItem("userthemeswitch");
  if (theme) {
    return dispatch => {
      dispatch({
        type: _const.TOGGLE_THEME,
        payload: JSON.parse(theme)
      });
    };
  } else {
    return dispatch => {
      dispatch({
        type: _const.NO_THEME_CHANGE,
        payload: true
      });
    };
  }
};

//Clear the data
export const clearData = () => {
  return {
    type: _const.CLEAR_DATA,
    payload: true
  };
};

//Toggle Modal
export const togglemodal = (payload: Boolean) => {
  return {
    type: _const.TOGGLE_MODAL,
    payload
  };
};

//Toggle STaking Modal
export const staketogglemodal = (payload) => {
  return {
    type: _const.TOGGLE_STAKE_MODAL,
    payload
  };
};

//Terms and Condition
export const toggletermsandconditions = (payload: Boolean) => {
  return {
    type: _const.TERMS_AND_CONDITIONS,
    payload
  };
};

//Gets all Form Inputs
export const getFormDetails = payload => {
  return dispatch => {
    dispatch({
      type: _const.FILL_OUT_FORM,
      payload: payload
    });
  };
};
