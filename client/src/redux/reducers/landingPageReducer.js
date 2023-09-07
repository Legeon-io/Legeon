import {
  CLOSE_FORGET_PASSWORD,
  OPEN_FORGET_PASSWORD,
  OPEN_LOGIN,
  OPEN_REGISTER,
  INCREMENT_PHASE,
} from "../constant";

const initialState = {
  showLogin: false,
  showRegister: false,
  showFP: false,
  phase: 0,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN:
      return {
        ...state,
        showLogin: !state.showLogin,
        showRegister: false,
      };
    case OPEN_REGISTER:
      return {
        ...state,
        showLogin: false,
        showRegister: !state.showRegister,
      };
    case OPEN_FORGET_PASSWORD:
      return {
        ...state,
        showLogin: false,
        showFP: true,
      };

    case CLOSE_FORGET_PASSWORD:
      return {
        ...state,
        showFP: false,
        phase: 0,
      };

    case INCREMENT_PHASE:
      if (state.phase == 2) {
        return {
          ...state,
          phase: 0,
        };
      } else {
        return {
          ...state,
          phase: state.phase++,
        };
      }

    default:
      return state;
  }
};

export default dashboardReducer;
