import { render } from "react-dom";
import App from "./containers/App";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import './index.css';

import './i18n'

render(
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>,
  document.getElementById("root")
);
