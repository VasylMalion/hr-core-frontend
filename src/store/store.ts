import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { AuthApi } from 'services/AuthService'
import { VacancyApi } from 'services/VacancyService'
import { EmployeeApi } from 'services/EmployeeService'
import { CandidateApi } from 'services/CandidateService'

import authSlice from './slices/authSlice'

const rootReducer = combineReducers({
  [AuthApi.reducerPath]: AuthApi.reducer,
  [VacancyApi.reducerPath]: VacancyApi.reducer,
  [EmployeeApi.reducerPath]: EmployeeApi.reducer,
  [CandidateApi.reducerPath]: CandidateApi.reducer,
  [authSlice.name]: authSlice.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      AuthApi.middleware,
      VacancyApi.middleware,
      EmployeeApi.middleware,
      CandidateApi.middleware,
    ),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']