import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "tarun_jk",
  first_name: "Tarun",
  last_name: "Jaikishan",
  email: "tarun@jk",
  location: "Coimbatore",
  mobile_number: 934,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    updateUserName: (state, action) => {
      state.username = action.payload;
      state.first_name = action.payload;
      state.last_name = action.payload;
      state.email = action.payload;
      state.mobile_number = action.payload;
      state.location = action.payload;
    },
    logOut: (state) => {
      // eslint-disable-next-line no-unused-vars
      state.username = "";
    },
  },
});

export const { updateUserName, logOut } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;
