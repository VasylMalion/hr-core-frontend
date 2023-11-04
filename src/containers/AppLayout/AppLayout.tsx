import { FunctionComponent } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import AppRouter, { AppRoutes, RoutePaths } from 'containers/AppRouter'
import { useScreenResolution } from 'hooks/useScreenResolution'
import { useAppSelector } from 'hooks/redux'
import Login from 'containers/Login/Login'

import Header from './Header/Header'
import AuthVerify from './Auth'

type AppLayoutProps = {
  setIsSidebarOpen: (value: boolean) => void
}

const AppLayout: FunctionComponent<AppLayoutProps> = ({ setIsSidebarOpen }) => {
  const { isPhoneLarge } = useScreenResolution()
  const location = useLocation()

  const isCollapsed = useAppSelector(state => state.auth.isCollapsed)
  const canBeCollapsed = isCollapsed && !isPhoneLarge

  const isLoginPage = location.pathname === RoutePaths[AppRoutes.LOGIN]

  return (
    <div>
      <AuthVerify />
      {
        isLoginPage ? (
          <Routes>
            <Route key={AppRoutes.LOGIN} path={AppRoutes.LOGIN} element={<Login />} />
          </Routes>
        ) : (
          <>
            <Header setIsSidebarOpen={setIsSidebarOpen} />
            <div
              className={`
                p-8 md:p-12 bg-purpleLight mt-20 min-h-content pb-16
                ${isPhoneLarge ? 'w-screen' : canBeCollapsed ? 'w-contentMax' : 'w-content'}
              `}
            >
              <AppRouter />
            </div>
          </>
        )
      }
    </div>
  )
}

export default AppLayout
