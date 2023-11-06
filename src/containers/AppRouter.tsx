import { Routes, Route, RouteProps, Navigate } from 'react-router-dom'

import {
  Dashboard,
  Profile,
  Candidates,
  CandidateDetails,
  CandidateAdding,
  Vacancies,
  VacancyDetails,
  VacancyAdding,
  Employees,
  EmployeeAdding,
  EmployeeDetails,
} from 'containers'

import PrivateRoute from './PrivateRouter'
import ProtectedRoute from './ProtectedRouter'

export enum AppRoutes {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  PROFILE = 'PROFILE',
  VACANCIES = 'VACANCIES',
  VACANCY_ADDING = 'VACANCY_ADDING',
  VACANCY_DETAILS = 'VACANCY_DETAILS',
  CANDIDATES = 'CANDIDATES',
  CANDIDATE_ADDING = 'CANDIDATE_ADDING',
  CANDIDATE_DETAILS = 'CANDIDATE_DETAILS',
  EMPLOYEES = 'EMPLOYEES',
  EMPLOYEE_ADDING = 'EMPLOYEE_ADDING',
  EMPLOYEE_DETAILS = 'EMPLOYEE_DETAILS',
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.DASHBOARD]: '/dashboard',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.VACANCIES]: '/vacancies',
  [AppRoutes.VACANCY_DETAILS]: '/vacancies/:id',
  [AppRoutes.VACANCY_ADDING]: '/vacancies/adding',
  [AppRoutes.CANDIDATES]: '/candidates',
  [AppRoutes.CANDIDATE_ADDING]: '/candidates/adding',
  [AppRoutes.CANDIDATE_DETAILS]: '/candidates/:id',
  [AppRoutes.EMPLOYEES]: '/employees',
  [AppRoutes.EMPLOYEE_ADDING]: '/employees/adding',
  [AppRoutes.EMPLOYEE_DETAILS]: '/employees/:id',
}

export const routeConfig: Array<RouteProps> = [
  {
    path: RoutePaths.DASHBOARD,
    element: <Dashboard />
  },
  {
    path: RoutePaths.PROFILE,
    element: <Profile />
  },
  {
    path: RoutePaths.VACANCIES,
    element: <Vacancies />
  },
  {
    path: RoutePaths.CANDIDATES,
    element: <Candidates />
  },
  {
    path: RoutePaths.CANDIDATE_DETAILS,
    element: <CandidateDetails />
  },
  {
    path: RoutePaths.CANDIDATE_ADDING,
    element: <CandidateAdding />
  },
  {
    path: RoutePaths.VACANCY_DETAILS,
    element: <VacancyDetails />
  },
  {
    path: RoutePaths.VACANCY_ADDING,
    element: <VacancyAdding />
  },
  {
    path: RoutePaths.EMPLOYEES,
    element: <Employees />
  },
  {
    path: RoutePaths.EMPLOYEE_ADDING,
    element: <EmployeeAdding />
  },
  {
    path: RoutePaths.EMPLOYEE_DETAILS,
    element: <EmployeeDetails />
  },
  {
    path: '*',
    element: <Navigate to={RoutePaths.DASHBOARD} />
  },
]

const AppRouter = () => {

  const routes = routeConfig.map(({ path, element }) => (
    <Route key={path} path={path} element={
      <PrivateRoute>
        <ProtectedRoute>
          {element}
        </ProtectedRoute>
      </PrivateRoute>}
    />
  ))

  return (
    <Routes>{routes}</Routes>
  )
}

export default AppRouter
