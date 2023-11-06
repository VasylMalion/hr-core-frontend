import { Suspense } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import ThemeProvider from 'common/theme/ThemeProvider'
import SuspensePreloader from 'components/SuspensePreloader/SuspensePreloader'
import { setupStore } from 'store/store'

import App from './containers/App'

import './index.css'
import './i18n'

const store = setupStore()

render(
  <Suspense fallback={<SuspensePreloader fullView />}>
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </Suspense>,
  document.getElementById('root')
)
