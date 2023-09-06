import {
  OPEN_LOGIN,
  OPEN_REGISTER,
  OPEN_FORGET_PASSWORD,
  CLOSE_FORGET_PASSWORD,
} from "../constant";

export const openLogin = () => {
  return {
    type: OPEN_LOGIN,
  };
};

export const openRegister = () => {
  return {
    type: OPEN_REGISTER,
  };
};

export const openForgetPassword = () => {
  return {
    type: OPEN_FORGET_PASSWORD,
  };
};

export const closeForgetPassword = () => {
  return {
    type: CLOSE_FORGET_PASSWORD,
  };
};
