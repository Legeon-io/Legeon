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

export const getUserDetails = (token) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/getuser`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      dispatch(setProfile(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const { setProfile } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
