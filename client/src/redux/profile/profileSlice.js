import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    userData: {},
    loading: false,
  },
  reducers: {
    setProfile: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
