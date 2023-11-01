import { createContext } from 'react'

import { Theme } from 'common/types/common'

type ThemeContextProps = {
  theme?: Theme
  setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})
