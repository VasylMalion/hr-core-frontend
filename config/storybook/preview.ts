import type { Preview } from '@storybook/react'
import '../../src/index.css'
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css'

import { withThemeByClassName } from '@storybook/addon-themes'
import { RouteDecorator } from '../../src/common/storybook/RouteDecorator'
import { mswDecorator } from './storybook-mocks'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'Light',
      values: [
        {
          name: 'Light',
          value: '#F5F6FA',
        },
        {
          name: 'Dark',
          value: '#201C34',
        },
      ],
    },
  },
}

export default preview

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
  RouteDecorator,
  mswDecorator,
]
