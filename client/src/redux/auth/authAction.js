import axios from "axios";
import {
  signInFailure,
  signInRequest,
  signInSuccess,
  signUpFailure,
  signUpRequest,
  signUpSuccess,
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
  validEmailFailure,
  validEmailRequest,
  validEmailSuccess,
  validOTPFailure,
  validOTPRequest,
  validOTPSuccess,
} from "./authSlice";
import { toast } from "react-toastify";
import { setProfile } from "../profile/profileSlice";
import {
  closeForgetPassword,
  incrementPhase,
  openLogin,
} from "../landingpage/landingPageSlice";

export const userSignInAction = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(signInRequest());
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/users/login`,
      userData,
      { withCredentials: true }
    );

    console.log(response);
    if (response.status === 200) {
      dispatch(signInSuccess());
      dispatch(setProfile(response.data.user));
      toast.success("Login Successfully !!!");
      setTimeout(() => {
        // window.location = "/dashboard";
        // navigate("/dashboard");
        window.location.href = "/dashboard";
      }, 2000);
    }
  } catch (error) {
    dispatch(signInFailure());
    if (error.response && error.response.status === 400) {
      toast.error("Invalid credentials !");
    } else if (error.response && error.response.status === 404) {
      toast.error("Account Not Registerd !");
    } else {
      toast.error("Internal server error");
    }
  }
};

export const userSignUpAction = (userData) => async (dispatch) => {
  try {
    dispatch(signUpRequest());
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/users/signup`,
      userData
    );
    console.log(response);
    if (response.status === 201) {
      dispatch(signUpSuccess());
      toast.success("Account Created Successfully !!!");
      dispatch(openLogin());
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch(signUpFailure());
    if (error.response && error.response.status === 409) {
      toast.error(error.response.data.error);
    } else if (error.response && error.response.status === 404) {
      toast.error("Missing Credentials !");
    } else {
      toast.error("Internal server error");
    }
  }
};

export const userValidEmail = (userData) => async (dispatch) => {
  try {
    dispatch(validEmailRequest());
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/users/validEmail`,
      userData
    );
    if (response.status === 200) {
      dispatch(validEmailSuccess());
      toast.success("OTP is send to your Email");
      dispatch(incrementPhase());
    }
  } catch (error) {
    dispatch(validEmailFailure());
    if (error.response && error.response.status === 400) {
      toast.error("Email Not Registerd !");
    } else {
      toast.error("Internal server error !");
    }
  }
};

export const userValidOTP = (userData) => async (dispatch) => {
  try {
    dispatch(validOTPRequest());
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/users/verifyOTP`,
      userData
    );
    if (response.status === 200) {
      dispatch(validOTPSuccess());
      toast.success("Valid OTP :)");
      dispatch(incrementPhase());
    }
  } catch (error) {
    dispatch(validOTPFailure());
    if (error.response && error.response.status === 409) {
      toast.error("OTP expired !");
    } else if (error.response && error.response.status === 401) {
      toast.error("Invalid OTP !");
    } else {
      toast.error("Internal server error !");
    }
  }
};

export const userUpdatePassword = (userData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/users/updatePassword`,
      userData
    );
    if (response.status === 200) {
      dispatch(updateUserSuccess());
      toast.success("Password updated successfully :)");
      dispatch(closeForgetPassword());
      dispatch(openLogin());
    }
  } catch (error) {
    dispatch(updateUserFailure());
    if (error.response && error.response.status === 409) {
      toast.error("Email Not verified !");
    } else if (error.response && error.response.status === 404) {
      toast.error("User not Found !");
    } else {
      toast.error("Internal server error !");
    }
  }
};
