import { createSlice } from "@reduxjs/toolkit";
const getProfileSlice = createSlice({
  name: "getProfile",
  initialState: {
    loading: false,
    data: null,
  },
  reducers: {
    getProfileRequest: (state) => {
      state.loading = true;
    },
    getProfileSuccess: (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
    },
    getProfileFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { getProfileRequest, getProfileSuccess, getProfileFailure } =
  getProfileSlice.actions;
export const profilePageReducer = getProfileSlice.reducer;
