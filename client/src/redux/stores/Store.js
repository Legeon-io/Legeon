import { configureStore } from "@reduxjs/toolkit";
import { landingPageReducer } from "../landingpage/landingPageSlice";
import { authReducer } from "../auth/authSlice";
import { profileReducer } from "../profile/profileSlice";
import { profilePageReducer } from "../profilePage/profilePageSlice";
import ServiceReducer from "../service/ServiceReducer";
import pppReducer from "../service_hub/ServiceHubReducer";

export const store = configureStore({
  reducer: {
    landingpage: landingPageReducer,
    // summa: authReducer,
    profile: profileReducer,
    authStore: authReducer,
    profilePageStore: profilePageReducer,
    serviceStore: ServiceReducer,
    publicProfileStore: pppReducer,
  },
});
