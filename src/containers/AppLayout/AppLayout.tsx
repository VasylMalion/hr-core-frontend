import { FunctionComponent } from "react";
import AppRouter, { AppRoutes, RoutePaths } from "containers/AppRouter";
import Header from "./Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "containers/Login/Login";

const AppLayout: FunctionComponent = () => {

  const location = useLocation()
  const isLoginPage = location.pathname === RoutePaths[AppRoutes.LOGIN]

  return (
    <div>
      {
        isLoginPage ? (
          <Routes>
            <Route key={AppRoutes.LOGIN} path={AppRoutes.LOGIN} element={<Login />} />
          </Routes>
        ) : (
          <>
            <Header />
            <div className='p-12 bg-purpleLight min-h-[calc(100vh_-_80px)]'>
              <AppRouter />
            </div>
          </>
        )
      }
    </div>
  )
}

export default AppLayout
