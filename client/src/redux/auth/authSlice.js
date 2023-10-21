import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loading: false,
  },
  reducers: {
    signInRequest: (state) => {
      state.loading = true;
    },
    signInSuccess: (state) => {
      state.loading = false;
    },
    signInFailure: (state) => {
      state.loading = false;
    },
    signUpRequest: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state) => {
      state.loading = false;
    },
    signUpFailure: (state) => {
      state.loading = false;
    },
    validEmailRequest: (state) => {
      state.loading = true;
    },
    validEmailSuccess: (state) => {
      state.loading = false;
    },
    validEmailFailure: (state) => {
      state.loading = false;
    },
    validOTPRequest: (state) => {
      state.loading = true;
    },
    validOTPSuccess: (state) => {
      state.loading = false;
    },
    validOTPFailure: (state) => {
      state.loading = false;
    },
    updateUserRequest: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state) => {
      state.loading = false;
    },
    updateUserFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpFailure,
  signUpSuccess,
  signUpRequest,
  validEmailRequest,
  validEmailSuccess,
  validEmailFailure,
  validOTPRequest,
  validOTPSuccess,
  validOTPFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure
} = authSlice.actions;

export const authReducer = authSlice.reducer;
