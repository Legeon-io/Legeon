import { configureStore } from "@reduxjs/toolkit";
import { landingPageReducer } from "../landingpage/landingPageSlice";
import { authReducer } from "../auth/authSlice";
import { profileReducer } from "../profile/profileSlice";

export const store = configureStore({
  reducer: {
    landingpage: landingPageReducer,
    // summa: authReducer,
    profile: profileReducer,
  },
});
