import axios from "axios";
import {
  SIGNIN_USER_FAILURE,
  SIGNIN_USER_REQUEST,
  SIGNIN_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
} from "../constant";
import { toast } from "react-toastify";

export const userSignInAction = (values) => {
  return async (dispatch) => {
    dispatch({ type: SIGNIN_USER_REQUEST });
    try {
      //   console.log(values);
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        values
      );
      console.log(response);
      if (response.status == 200) {
        dispatch({ type: SIGNIN_USER_SUCCESS, payload: response.user });
        toast.success("Login Successfully !!!");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: SIGNIN_USER_FAILURE,
      });
      toast.error(error.response.data.error);
    }
  };
};

export const userSignUpAction = (values) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_USER_REQUEST });
    try {
        console.log(values);
      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        values
      );
      console.log(response);
      if (response.status == 200) {
        dispatch({ type: SIGNUP_USER_SUCCESS, payload: response.user });
        toast.success("Account Created Successfully !!!");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: SIGNUP_USER_FAILURE,
      });
      toast.error(error.response.data.error);
    }
  };
};
