import { Suspense } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { setupStore } from 'store/store'

import App from './containers/App'

import './index.css'
import './i18n'

const store = setupStore()

render(
  <Suspense fallback={<div className='h-full w-full'>Loading...</div>}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>,
  document.getElementById('root')
)
