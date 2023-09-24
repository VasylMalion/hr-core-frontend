import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "services/AuthService";
import authSlice from "./slices/authSlice";
import { JobApi } from "services/JobService";

const rootReducer = combineReducers({
  [AuthApi.reducerPath]: AuthApi.reducer,
  [JobApi.reducerPath]: JobApi.reducer,
  [authSlice.name]: authSlice.reducer, 
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthApi.middleware, JobApi.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']