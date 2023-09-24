import { render } from "react-dom";
import App from "./containers/App";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import './index.css';
import './i18n'

import { setupStore } from 'store/store'
import { Provider } from "react-redux";

const store = setupStore()

render(
  <Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>,
  document.getElementById("root")
);
