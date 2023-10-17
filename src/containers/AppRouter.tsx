import { Routes, Route } from "react-router-dom";
import { RouteProps } from "react-router-dom"

import Dashboard from "./Dashboard/Dashboard";
import Candidates from "./Candidates/Candidates";
import Vacancies from "./Vacancies/Vacancies";
import VacancyDetails from "./Vacancies/VacancyDetails/VacancyDetails";
import PrivateRoute from "./PrivateRouter";
import VacancyAdding from "./Vacancies/VacancyAdding/VacancyAdding";
import Profile from "./Profile/Profile";
import EmployeesList from "./Employees/EmployeesList";
import EmployeeAdding from "./Employees/EmployeeAdding/EmployeeAdding";
import EmployeeDetails from "./Employees/EmployeeDetails/EmployeeDetails";

export enum  AppRoutes {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  MESSAGES = 'MESSAGES',
  PROFILE = 'PROFILE',
  VACANCIES = 'VACANCIES',
  VACANCY_ADDING = 'VACANCY_ADDING',
  VACANCY_DETAILS = 'VACANCY_DETAILS',
  CANDIDATES = 'CANDIDATES',
  REFERRALS = 'REFERRALS',
  CAREER = 'CAREER',
  EMPLOYEES = 'EMPLOYEES',
  STRUCTURE = 'STRUCTURE',
  REPORT = 'REPORT',
  SETTINGS = 'SETTINGS',
  EMPLOYEE_ADDING = 'EMPLOYEE_ADDING',
  EMPLOYEE_DETAILS = 'EMPLOYEE_DETAILS',
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.DASHBOARD]: '/',
  [AppRoutes.MESSAGES]: '/messages',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.VACANCIES]: '/vacancies',
  [AppRoutes.VACANCY_DETAILS]: '/vacancy/:id',
  [AppRoutes.VACANCY_ADDING]: '/vacancy/adding',
  [AppRoutes.CANDIDATES]: '/candidates',
  [AppRoutes.REFERRALS]: '/referrals',
  [AppRoutes.CAREER]: '/career',
  [AppRoutes.EMPLOYEES]: '/employees',
  [AppRoutes.STRUCTURE]: '/structure',
  [AppRoutes.REPORT]: '/report',
  [AppRoutes.SETTINGS]: '/settings',
  [AppRoutes.EMPLOYEE_ADDING]: '/employees/add',
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
    path: RoutePaths.VACANCY_DETAILS,
    element: <VacancyDetails />
  },
  {
    path: RoutePaths.VACANCY_ADDING,
    element: <VacancyAdding />
  },
  {
    path: RoutePaths.EMPLOYEES,
    element: <EmployeesList />
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
    element: <div>Not found</div>
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
