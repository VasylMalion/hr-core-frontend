import { FunctionComponent, ReactNode, useMemo, useState } from 'react'

import { ThemeContext } from './ThemeContext'
import { LOCAL_STORAGE_THEME_KEY } from 'common/constants'
import { Theme } from 'common/types/common'

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT

type ThemeProviderProps = {
  children: ReactNode
}

const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  const defaultProps = useMemo(() => ({
    theme: theme,
    setTheme: setTheme,
  }), [theme])

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
