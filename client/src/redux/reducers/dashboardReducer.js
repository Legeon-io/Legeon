import {
  CLOSE_FORGET_PASSWORD,
  OPEN_FORGET_PASSWORD,
  OPEN_LOGIN,
  OPEN_REGISTER,
} from "../constant";

const initialState = {
  showLogin: false,
  showRegister: false,
  showFP: 0,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN:
      return {
        ...state,
        showLogin: !state.showLogin,
      };
    case OPEN_REGISTER:
      return {
        ...state,
        showLogin: false,
        showRegister: !state.showRegister,
      };
    case OPEN_FORGET_PASSWORD:
      return {
        showFP: state.showFP++,
      };

    case CLOSE_FORGET_PASSWORD:
      return {
        ...state,
        showFP: 0,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
