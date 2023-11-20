import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'

import { AuthApi } from 'services/AuthService'
import { VacancyApi } from 'services/VacancyService'
import { EmployeeApi } from 'services/EmployeeService'
import { CandidateApi } from 'services/CandidateService'
import { PasswordApi } from 'services/PasswordService'

import authSlice from './slices/authSlice'

const rootReducer = combineReducers({
  [AuthApi.reducerPath]: AuthApi.reducer,
  [VacancyApi.reducerPath]: VacancyApi.reducer,
  [EmployeeApi.reducerPath]: EmployeeApi.reducer,
  [CandidateApi.reducerPath]: CandidateApi.reducer,
  [PasswordApi.reducerPath]: PasswordApi.reducer,
  [authSlice.name]: authSlice.reducer,
})

export const setupStore: any = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(
        AuthApi.middleware,
        VacancyApi.middleware,
        EmployeeApi.middleware,
        CandidateApi.middleware,
        PasswordApi.middleware
      ),
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
