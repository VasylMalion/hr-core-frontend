import { FunctionComponent, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from 'hooks/redux'
import { AppRoutes, RoutePaths } from './AppRouter'
import { RoleTypes } from 'common/types/common'

type PrivateRouteProps = {
  children: ReactNode
}

const ProtectedRoute: FunctionComponent<PrivateRouteProps> = ({ children }) => {
  const { pathname } = useLocation()

  const routes = [
    RoutePaths.LOGIN,
    RoutePaths.DASHBOARD,
    RoutePaths.PROFILE,
    RoutePaths.EMPLOYEES,
    RoutePaths.EMPLOYEE_DETAILS,
  ]

  const data = useAppSelector((state) => state.auth.userInfo)

  if (data?.role === RoleTypes.ADMIN) return children

  const isIncludedPath =
    routes.includes(pathname as AppRoutes) ||
    (pathname.startsWith(RoutePaths.EMPLOYEES) &&
      pathname !== RoutePaths.EMPLOYEE_ADDING)

  return isIncludedPath ? children : <Navigate to={RoutePaths.DASHBOARD} />
}

export default ProtectedRoute
