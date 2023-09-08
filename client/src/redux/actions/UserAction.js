import axios from "axios";
import {
  EMAIL_VALID_FAILURE,
  EMAIL_VALID_REQUEST,
  EMAIL_VALID_SUCCESS,
  OTP_VALID_FAILURE,
  OTP_VALID_REQUEST,
  OTP_VALID_SUCCESS,
  SIGNIN_USER_FAILURE,
  SIGNIN_USER_REQUEST,
  SIGNIN_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
} from "../constant";
import { toast } from "react-toastify";

export const userSignInAction = (values) => {
  return async (dispatch) => {
    dispatch({ type: SIGNIN_USER_REQUEST });
    try {
      //   console.log(values);
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        values,
        { withCredentials: true }
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
      if (error.response && error.response.status === 400) {
        toast.error("Invalid credintials !");
      } else {
        toast.error("Internal server error");
      }
    }
  };
};

export const userSignUpAction = (values, navigate) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_USER_REQUEST });
    try {
      console.log(values);
      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        values
      );
      console.log(response);
      if (response.status == 201) {
        dispatch({ type: SIGNUP_USER_SUCCESS, payload: response.user });
        toast.success("Account Created Successfully !!!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: SIGNUP_USER_FAILURE,
      });
      if (error.response && error.response.status === 409) {
        toast.error("Already Registered !");
      } else if (error.response && error.response.status === 404) {
        toast.error("Missing Credentials !");
      } else {
        toast.error("Internal server error");
      }
    }
  };
};

export const userValidEmail = (values, navigate) => {
  console.log(values);
  return async (dispatch) => {
    dispatch({ type: EMAIL_VALID_REQUEST });
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/validEmail",
        values
      );
      console.log(response);
      if (response.status == 200) {
        dispatch({ type: EMAIL_VALID_SUCCESS, payload: response.data });
        toast.success("OTP is send to your Email");
        navigate("/otp");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: EMAIL_VALID_FAILURE,
      });
      if (error.response && error.response.status === 400) {
        toast.error("Email is not valid !");
      } else {
        toast.error("Internal server error !");
      }
    }
  };
};

export const userValidOTP = (values, navigate) => {
  console.log(values);
  return async (dispatch) => {
    dispatch({ type: OTP_VALID_REQUEST });
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/verifyOTP",
        values
      );
      if (response.status === 200) {
        dispatch({ type: OTP_VALID_SUCCESS });
        toast.success("Valid OTP :)");
        navigate("/recover");
      }
    } catch (error) {
      dispatch({ type: OTP_VALID_FAILURE });
      if (error.response && error.response.status === 409) {
        toast.error("OTP expired !");
      } else if (error.response && error.response.status === 404) {
        toast.error("Invalid OTP !");
      } else {
        toast.error("Internal server error !");
      }
    }
  };
};

export const userUpdatePassword = (values, navigate) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/updatePassword",
        values
      );
      console.log(values, response);
      if (response.status === 200) {
        dispatch({ type: UPDATE_PASSWORD_SUCCESS });
        toast.success("Password updated successfully :)");
        navigate("/");
      }
    } catch (error) {
      dispatch({ type: UPDATE_PASSWORD_FAILURE });
      if (error.response && error.response.status === 409) {
        toast.error("Email Not verified !");
      } else if (error.response && error.response.status === 404) {
        toast.error("User not Found !");
      } else {
        toast.error("Internal server error !");
      }
    }
  };
};
