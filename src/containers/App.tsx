import { FunctionComponent, useState } from "react";

import { Navbar } from "ui-components";
import { useLocation } from "react-router-dom";
import { useScreenResolution } from "hooks/useScreenResolution";

import AppLayout from "./AppLayout/AppLayout";
import { AppRoutes, RoutePaths } from "./AppRouter";

const App: FunctionComponent = () => {

  const location = useLocation()
  const { isPhoneLarge } = useScreenResolution()

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const isLoginPage = location.pathname === RoutePaths[AppRoutes.LOGIN]

  return (
    <div className={`grid bg-white ${isPhoneLarge ? 'grid-cols-[1fr]' : 'grid-cols-[16rem_1fr]'}`}>
      {!isLoginPage && !isPhoneLarge && <Navbar />}
      <div>
        <AppLayout setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
      </div>
      {
        !isLoginPage && isPhoneLarge && (
          <div className={`${isSidebarOpen ? 'left-0' : 'left-[-20rem]'} 
        fixed bg-white top-[5rem] transition-all	duration-150 ease-in`}
          >
            <Navbar />
          </div>
        )
      }
    </div>
  )
}

export default App
