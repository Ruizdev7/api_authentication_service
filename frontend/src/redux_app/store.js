import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { authApi } from "./services/authAPI";
import authAPISlice from "./role_base_access_control/authSlice";

import { RBACApi } from "./services/rbacAPI";
import { rolesApi } from "./services/rolesAPI";
import { RBACModulesApi } from "./services/rbacModulesAPI";

const rootReducer = combineReducers({
  authAPISlice: authAPISlice,
  [authApi.reducerPath]: authApi.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
  [RBACApi.reducerPath]: RBACApi.reducer,
  [RBACModulesApi.reducerPath]: RBACModulesApi.reducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "authApi",
    "rolesApi",
    "RBACApi",
    "RBACModulesApi",
    "authAPISlice",
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  //middleware:[thunk],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      rolesApi.middleware,
      RBACApi.middleware,
      RBACModulesApi.middleware
    ),
});
export default store;

setupListeners(store.dispatch);
