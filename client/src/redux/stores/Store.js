import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import sessionReducer from "../reducers/Reducers.js";
import dashboardReducer from "../reducers/dashboardReducer.js";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  session: persistReducer(persistConfig, sessionReducer),
});

const store = configureStore(
  {
    reducer: {
      dashboard: dashboardReducer,
      session: rootReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  },
  composeWithDevTools(applyMiddleware(logger))
);

const persistor = persistStore(store);

export { store, persistor };
