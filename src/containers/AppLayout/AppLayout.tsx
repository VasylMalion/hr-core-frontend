import { FunctionComponent } from "react";
import AppRouter, { AppRoutes, RoutePaths } from "containers/AppRouter";
import Header from "./Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "containers/Login/Login";
import AuthVerify from "./Auth";

type AppLayoutProps = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (value: boolean) => void
}

const AppLayout: FunctionComponent<AppLayoutProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {

  const location = useLocation()
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
            <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className='p-12 bg-purpleLight mt-[5rem] min-h-[calc(100vh_-_5rem)]'>
              <AppRouter />
            </div>
          </>
        )
      }
    </div>
  )
}

export default AppLayout
