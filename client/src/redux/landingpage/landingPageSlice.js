import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLogin: false,
  showRegister: false,
  showFP: false,
  phase: 0,
};

const landingPageSlice = createSlice({
  name: "landingPageSlice",
  initialState,
  reducers: {
    openLogin: (state) => {
      state.showLogin = !state.showLogin;
      state.showRegister = false;
    },
    openRegister: (state) => {
      state.showLogin = false;
      state.showRegister = !state.showRegister;
    },
    openForgetPassword: (state) => {
      state.showLogin = false;
      state.showFP = true;
    },
    closeForgetPassword: (state) => {
      state.showFP = false;
      state.phase = 0;
    },
    incrementPhase: (state) => {
      if (state.phase == 2) {
        state.phase = 0;
      } else {
        state.phase = state.phase++;
      }
    },
  },
});

export const {
  openLogin,
  openRegister,
  openForgetPassword,
  closeForgetPassword,
  incrementPhase,
} = landingPageSlice.actions;

export const landingPageReducer = landingPageSlice.reducer;
