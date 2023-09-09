import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: {},
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const getGoogleUserDetails = () => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:8080/auth/success");

    if (response.status === 200) {
      console.log(response.data);
      dispatch(setProfile(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const { setProfile } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
