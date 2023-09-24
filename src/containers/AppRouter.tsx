import { Routes, Route } from "react-router-dom";

import { RouteProps } from "react-router-dom"
import Dashboard from "./Dashboard/Dashboard";
import Candidates from "./Candidates/Candidates";
import JobsList from "./Jobs/JobsList/JobsList";
import JobDetails from "./JobDetails/JobDetails";
import PrivateRoute from "./PrivateRouter";
import JobCreation from "./Jobs/JobCreate/JobCreate";
import Profile from "./Profile/Profile";
import EmployeesList from "./Employees/EmployeesList";

export enum  AppRoutes {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  MESSAGES = 'MESSAGES',
  PROFILE = 'PROFILE',
  JOBS = 'JOBS',
  JOB_DETAILS = 'JOB_DETAILS',
  CANDIDATES = 'CANDIDATES',
  REFERRALS = 'REFERRALS',
  CAREER = 'CAREER',
  EMPLOYEES = 'EMPLOYEES',
  STRUCTURE = 'STRUCTURE',
  REPORT = 'REPORT',
  SETTINGS = 'SETTINGS',
  JOB_CREATION = 'JOB_CREATION',
  EMPLOYEE_ADDING = 'EMPLOYEE_ADDING',
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.DASHBOARD]: '/',
  [AppRoutes.MESSAGES]: '/messages',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.JOBS]: '/jobs',
  [AppRoutes.JOB_DETAILS]: '/jobs/:id',
  [AppRoutes.JOB_CREATION]: '/jobs/creation',
  [AppRoutes.CANDIDATES]: '/candidates',
  [AppRoutes.REFERRALS]: '/referrals',
  [AppRoutes.CAREER]: '/career',
  [AppRoutes.EMPLOYEES]: '/employees',
  [AppRoutes.STRUCTURE]: '/structure',
  [AppRoutes.REPORT]: '/report',
  [AppRoutes.SETTINGS]: '/settings',
  [AppRoutes.EMPLOYEE_ADDING]: '/employees/add',
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
    path: RoutePaths.JOBS,
    element: <JobsList />
  },
  {
    path: RoutePaths.CANDIDATES,
    element: <Candidates />
  },
  {
    path: RoutePaths.JOB_DETAILS,
    element: <JobDetails />
  },
  {
    path: RoutePaths.JOB_CREATION,
    element: <JobCreation />
  },
  {
    path: RoutePaths.EMPLOYEES,
    element: <EmployeesList />
  },
  {
    path: RoutePaths.EMPLOYEE_ADDING,
    element: <EmployeesList />
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
