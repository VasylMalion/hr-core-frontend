import { FunctionComponent, useEffect } from "react";
import AppLayout from "./AppLayout/AppLayout";
import { Navbar } from "ui-components";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { AppRoutes, RoutePaths } from "./AppRouter";

const App: FunctionComponent = () => {

  const {t} = useTranslation()

  const location = useLocation()
  const isLoginPage = location.pathname === RoutePaths[AppRoutes.LOGIN]

    return <div className='grid grid-cols-[auto_1fr] bg-white'>
      {!isLoginPage && <Navbar />}
        <div>
          <AppLayout />
        </div>
    </div>
}

export default App
