import { configureStore } from "@reduxjs/toolkit";
import { landingPageReducer } from "../landingpage/landingPageSlice";

export const store = configureStore({
  reducer: {
    landingpage: landingPageReducer,
    // session: rootReducer,
  },
});
