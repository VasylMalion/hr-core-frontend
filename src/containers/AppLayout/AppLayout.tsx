import { FunctionComponent, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import SuspensePreloader from 'components/SuspensePreloader/SuspensePreloader'
import AppRouter, { AppRoutes, RoutePaths } from 'containers/AppRouter'
import { useScreenResolution } from 'hooks/useScreenResolution/useScreenResolution'
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

  const isCollapsed = useAppSelector((state) => state.auth.isCollapsed)
  const canBeCollapsed = isCollapsed && !isPhoneLarge

  const isLoginPage = location.pathname === RoutePaths[AppRoutes.LOGIN]

  return (
    <div>
      <AuthVerify />
      {isLoginPage ? (
        <Routes>
          <Route
            key={AppRoutes.LOGIN}
            path={AppRoutes.LOGIN}
            element={<Login />}
          />
        </Routes>
      ) : (
        <>
          <Header setIsSidebarOpen={setIsSidebarOpen} />
          <div
            className={`
                p-8 md:p-12 dark:bg-dark-300 bg-purpleLight mt-20 min-h-content pb-16
                ${
                  isPhoneLarge
                    ? 'w-screen'
                    : canBeCollapsed
                    ? 'w-contentMax'
                    : 'w-content'
                }
              `}
          >
            <Suspense fallback={<SuspensePreloader />}>
              <AppRouter />
            </Suspense>
          </div>
        </>
      )}
    </div>
  )
}

export default AppLayout
