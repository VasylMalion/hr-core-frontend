import { FunctionComponent, ReactNode } from 'react'
import { Navigate, Route, useLocation } from 'react-router-dom'

import { useAppSelector } from 'hooks/redux'
import { AppRoutes, RoutePaths } from './AppRouter'
import { RoleTypes } from 'common/types/common'

type PrivateRouteProps = {
  children: ReactNode
}

const routes = [
  '/login',
  '/dashboard',
  '/profile'
  // RoutePaths.PROFILE,
  // RoutePaths.EMPLOYEES,
  // RoutePaths.EMPLOYEE_DETAILS,
]

const ProtectedRoute: FunctionComponent<PrivateRouteProps> = ({ children }) => {
  const { pathname } = useLocation()

  const data = useAppSelector(state => state.auth.userInfo)

  if (data?.role === RoleTypes.ADMIN) return children

  const isIncludedPath = routes.includes(pathname as AppRoutes)

  return isIncludedPath ? children : <Navigate to={RoutePaths.DASHBOARD} />
}

export default ProtectedRoute
