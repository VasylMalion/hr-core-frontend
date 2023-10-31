import { Routes, Route, RouteProps, Navigate } from "react-router-dom"

import Dashboard from "./Dashboard/Dashboard"
import Candidates from "./Candidates/Candidates"
import CandidateDetails from "./Candidates/CandidateDetails/CandidateDetails"
import CandidateAdding from "./Candidates/CandidateAdding/CandidateAdding"
import Vacancies from "./Vacancies/Vacancies"
import VacancyDetails from "./Vacancies/VacancyDetails/VacancyDetails"
import PrivateRoute from "./PrivateRouter"
import VacancyAdding from "./Vacancies/VacancyAdding/VacancyAdding"
import Profile from "./Profile/Profile"
import Employees from "./Employees/Employees"
import EmployeeAdding from "./Employees/EmployeeAdding/EmployeeAdding"
import EmployeeDetails from "./Employees/EmployeeDetails/EmployeeDetails"

export enum  AppRoutes {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  MESSAGES = 'MESSAGES',
  PROFILE = 'PROFILE',
  VACANCIES = 'VACANCIES',
  VACANCY_ADDING = 'VACANCY_ADDING',
  VACANCY_DETAILS = 'VACANCY_DETAILS',
  CANDIDATES = 'CANDIDATES',
  CANDIDATE_ADDING = 'CANDIDATE_ADDING',
  CANDIDATE_DETAILS = 'CANDIDATE_DETAILS',
  REFERRALS = 'REFERRALS',
  CAREER = 'CAREER',
  EMPLOYEES = 'EMPLOYEES',
  REPORT = 'REPORT',
  SETTINGS = 'SETTINGS',
  EMPLOYEE_ADDING = 'EMPLOYEE_ADDING',
  EMPLOYEE_DETAILS = 'EMPLOYEE_DETAILS',
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.DASHBOARD]: '/dashboard',
  [AppRoutes.MESSAGES]: '/messages',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.VACANCIES]: '/vacancies',
  [AppRoutes.VACANCY_DETAILS]: '/vacancies/:id',
  [AppRoutes.VACANCY_ADDING]: '/vacancies/adding',
  [AppRoutes.CANDIDATES]: '/candidates',
  [AppRoutes.CANDIDATE_ADDING]: '/candidates/adding',
  [AppRoutes.CANDIDATE_DETAILS]: '/candidates/:id',
  [AppRoutes.REFERRALS]: '/referrals',
  [AppRoutes.CAREER]: '/career',
  [AppRoutes.EMPLOYEES]: '/employees',
  [AppRoutes.REPORT]: '/report',
  [AppRoutes.SETTINGS]: '/settings',
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

  const routes = routeConfig.map(({path, element}) => (
    <Route key={path} path={path} element={<PrivateRoute>{element}</PrivateRoute>}/>
  ))

  return (
    <Routes>
      {routes}
    </Routes>
  );
};

export default AppRouter;
