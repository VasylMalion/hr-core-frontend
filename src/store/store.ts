import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "services/AuthService";
import authSlice from "./slices/authSlice";
import { JobApi } from "services/JobService";
import { EmployeeApi } from "services/EmployeeService";

const rootReducer = combineReducers({
  [AuthApi.reducerPath]: AuthApi.reducer,
  [JobApi.reducerPath]: JobApi.reducer,
  [EmployeeApi.reducerPath]: EmployeeApi.reducer,
  [authSlice.name]: authSlice.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthApi.middleware, JobApi.middleware, EmployeeApi.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']