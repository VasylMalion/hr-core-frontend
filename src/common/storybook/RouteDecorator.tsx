import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { setupStore } from 'store/store'

const store = setupStore()

export const RouteDecorator = (story: any) => (
  <Provider store={store}>
    <BrowserRouter>{story()}</BrowserRouter>
  </Provider>
)
