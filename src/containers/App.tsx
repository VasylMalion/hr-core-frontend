import { FunctionComponent, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Navbar } from 'ui-components'
import { useScreenResolution } from 'hooks/useScreenResolution'
import { useTheme } from 'common/theme/useTheme'

import AppLayout from './AppLayout/AppLayout'
import { AppRoutes, RoutePaths } from './AppRouter'

const App: FunctionComponent = () => {
  const location = useLocation()
  const { isPhoneLarge } = useScreenResolution()

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const isLoginPage = location.pathname === RoutePaths[AppRoutes.LOGIN]

  const { theme , toggleTheme } = useTheme()

  return (
    <div className={`grid bg-white ${theme} ${isPhoneLarge ? 'grid-cols-[1fr]' : 'grid-cols-[auto_1fr]'}`}>
      {!isLoginPage && !isPhoneLarge && <Navbar toggleTheme={toggleTheme} />}
      <div className='dark:text-white'>
        <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      {
        !isLoginPage && isPhoneLarge && (
          <div
            className={`
              ${isSidebarOpen ? 'left-0' : 'left-[-20rem]'} 
              fixed top-20 transition-all	duration-150 ease-in
            `}
          >
            <Navbar setIsSidebarOpen={setIsSidebarOpen} toggleTheme={toggleTheme} />
          </div>
        )
      }
    </div>
  )
}

export default App
