import { lazy } from "react";

const App = lazy(() => import('./App'))
const Candidates = lazy(() => import('./Candidates/Candidates'))
const Dashboard = lazy(() => import('./Dashboard/Dashboard'))


export {
  App,
  Candidates,
  Dashboard,
}
