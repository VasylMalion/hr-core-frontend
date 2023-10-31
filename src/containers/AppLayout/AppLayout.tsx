import { FunctionComponent } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import AppRouter, { AppRoutes, RoutePaths } from "containers/AppRouter";
import Login from "containers/Login/Login";

import Header from "./Header/Header";
import AuthVerify from "./Auth";
import { useScreenResolution } from "hooks/useScreenResolution";

type AppLayoutProps = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (value: boolean) => void
}

const AppLayout: FunctionComponent<AppLayoutProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {

  const location = useLocation()
  const isLoginPage = location.pathname === RoutePaths[AppRoutes.LOGIN]
  const { isPhoneLarge } = useScreenResolution()

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
            <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className={`p-8 md:p-12 bg-purpleLight mt-[5rem] min-h-[calc(100vh_-_5rem)] ${isPhoneLarge ? 'w-screen' : 'w-[calc(100vw_-_16rem)]'}`}>
              <AppRouter />
            </div>
          </>
        )
      }
    </div>
  )
}

export default AppLayout
