import { configureStore } from "@reduxjs/toolkit";
import { landingPageReducer } from "../landingpage/landingPageSlice";
import { authReducer } from "../auth/authSlice";

export const store = configureStore({
  reducer: {
    landingpage: landingPageReducer,
    summa: authReducer,
  },
});
