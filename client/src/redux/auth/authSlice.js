import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  closeForgetPassword,
  incrementPhase,
  openLogin,
} from "../landingpage/landingPageSlice";
import { setProfile } from "../profile/profileSlice";
import { useNavigate } from "react-router-dom";

const initialState = {};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logOut: (state) => {},
  },
});

export const userSignInAction = (userData, navigate) => async (dispatch) => {
  try {
    console.log(userData);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/users/login`,
      userData,
      { withCredentials: true }
    );

    if (response.status === 200) {
      dispatch(setProfile(response.data.user));
      toast.success("Login Successfully !!!");
      setTimeout(() => {
        // window.location = "/dashboard";
        // navigate("/dashboard");
        window.location.href = "/dashboard";
      }, 2000);
    }
  } catch (error) {
    console.log(error);

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
    console.log(userData);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/users/signup`,
      userData
    );
    console.log(response);
    if (response.status == 201) {
      toast.success("Account Created Successfully !!!");
      dispatch(openLogin());
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast.error("Account Already Registered !");
    } else if (error.response && error.response.status === 404) {
      toast.error("Missing Credentials !");
    } else {
      toast.error("Internal server error");
    }
  }
};

export const userValidEmail = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/users/validEmail`,
      userData
    );
    if (response.status == 200) {
      toast.success("OTP is send to your Email");
      dispatch(incrementPhase());
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error("Email Not Registerd !");
    } else {
      toast.error("Internal server error !");
    }
  }
};

export const userValidOTP = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/users/verifyOTP`,
      userData
    );
    if (response.status === 200) {
      toast.success("Valid OTP :)");
      dispatch(incrementPhase());
    }
  } catch (error) {
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
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/users/updatePassword`,
      userData
    );
    if (response.status === 200) {
      toast.success("Password updated successfully :)");
      dispatch(closeForgetPassword());
      dispatch(openLogin());
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast.error("Email Not verified !");
    } else if (error.response && error.response.status === 404) {
      toast.error("User not Found !");
    } else {
      toast.error("Internal server error !");
    }
  }
};

export const {} = authSlice.actions;

export const authReducer = authSlice.reducer;
