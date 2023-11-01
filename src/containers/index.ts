import { lazy } from 'react'

const App = lazy(() => import('./App'))
const Dashboard = lazy(() => import('./Dashboard/Dashboard'))
const Profile = lazy(() => import('./Profile/Profile'))
const Candidates = lazy(() => import('./Candidates/Candidates'))
const CandidateDetails = lazy(() => import('./Candidates/CandidateDetails/CandidateDetails'))
const CandidateAdding = lazy(() => import('./Candidates/CandidateAdding/CandidateAdding'))
const Vacancies = lazy(() => import('./Vacancies/Vacancies'))
const VacancyDetails = lazy(() => import('./Vacancies/VacancyDetails/VacancyDetails'))
const VacancyAdding = lazy(() => import('./Vacancies/VacancyAdding/VacancyAdding'))
const Employees = lazy(() => import('./Employees/Employees'))
const EmployeeAdding = lazy(() => import('./Employees/EmployeeAdding/EmployeeAdding'))
const EmployeeDetails = lazy(() => import('./Employees/EmployeeDetails/EmployeeDetails'))

export {
  App,
  Dashboard,
  Profile,
  Candidates,
  CandidateDetails,
  CandidateAdding,
  Vacancies,
  VacancyDetails,
  VacancyAdding,
  Employees,
  EmployeeDetails,
  EmployeeAdding,
}
