import { useContext } from 'react'

import { LOCAL_STORAGE_THEME_KEY } from 'common/constants'
import { Theme } from 'common/types/common'

import { ThemeContext } from './ThemeContext'

type UseThemeResult = {
  toggleTheme: () => void
  theme: Theme
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    setTheme(newTheme)
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  };

  return { theme, toggleTheme }
}
