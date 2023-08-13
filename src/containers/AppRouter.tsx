import { Routes, Route } from "react-router-dom";

import { RouteProps } from "react-router-dom"
import Dashboard from "./Dashboard/Dashboard";
import Candidates from "./Candidates/Candidates";
import JobsList from "./Jobs/JobsList/JobsList";

export enum  AppRoutes {
  DASHBOARD = 'DASHBOARD',
  MESSAGES = 'MESSAGES',
  CALENDAR = 'CALENDAR',
  JOBS = 'JOBS',
  CANDIDATES = 'CANDIDATES',
  REFERRALS = 'REFERRALS',
  CAREER = 'CAREER',
  EMPLOYEES = 'EMPLOYEES',
  STRUCTURE = 'STRUCTURE',
  REPORT = 'REPORT',
  SETTINGS = 'SETTINGS',
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.DASHBOARD]: '/',
  [AppRoutes.MESSAGES]: '/messages',
  [AppRoutes.CALENDAR]: '/calendar',
  [AppRoutes.JOBS]: '/jobs',
  [AppRoutes.CANDIDATES]: '/candidates',
  [AppRoutes.REFERRALS]: '/referrals',
  [AppRoutes.CAREER]: '/career',
  [AppRoutes.EMPLOYEES]: '/employees',
  [AppRoutes.STRUCTURE]: '/structure',
  [AppRoutes.REPORT]: '/report',
  [AppRoutes.SETTINGS]: '/settings',
}

export const routeConfig: Array<RouteProps> = [
  {
    path: RoutePaths.DASHBOARD,
    element: <Dashboard />
  },
  {
    path: RoutePaths.JOBS,
    element: <JobsList />
  },
  {
    path: RoutePaths.CANDIDATES,
    element: <Candidates />
  }
]

const AppRouter = () => {

  const routes = routeConfig.map(({path, element}) => (
    <Route key={path} path={path} element={element}/>
  ))

  return (
    <Routes>
      {routes}
    </Routes>
  );
};

export default AppRouter;
