import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { incrementPhase, openLogin } from "../landingpage/landingPageSlice";

const initialState = {};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    // logOut: (state) => {},
  },
});

export const userSignInAction = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/login",
      userData,
      { withCredentials: true }
    );

    if (response.status === 200) {
      toast.success("Login Successfully !!!");
      setTimeout(() => {
        window.location = "/dashboard";
      }, 2000);
    }
  } catch (error) {
    console.log(error);

    if (error.response && error.response.status === 400) {
      toast.error("Invalid credentials !");
    } else {
      toast.error("Internal server error");
    }
  }
};

export const userSignUpAction = (userData) => async (dispatch) => {
  try {
    console.log(userData);
    const response = await axios.post(
      "http://localhost:8080/api/users/signup",
      userData
    );
    console.log(response);
    if (response.status == 201) {
      toast.success("Account Created Successfully !!!");
      dispatch(openLogin());
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast.error("Already Registered !");
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
      "http://localhost:8080/api/users/validEmail",
      userData
    );
    if (response.status == 200) {
      toast.success("OTP is send to your Email");
      dispatch(incrementPhase());
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error("Email is not valid !");
    } else {
      toast.error("Internal server error !");
    }
  }
};

export const userValidOTP = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/verifyOTP",
      userData
    );
    if (response.status === 200) {
      toast.success("Valid OTP :)");
      dispatch(incrementPhase());
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast.error("OTP expired !");
    } else if (error.response && error.response.status === 404) {
      toast.error("Invalid OTP !");
    } else {
      toast.error("Internal server error !");
    }
  }
};

export const userUpdatePassword = (userData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/updatePassword",
      userData
    );
    if (response.status === 200) {
      toast.success("Password updated successfully :)");
      navigate("/");
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
