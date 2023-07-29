import { render } from "react-dom";
import "app/styles/index.scss";
import App from "app/App";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { ThemeProvider } from "app/providers/ThemeProvider";

render(
  <Suspense fallback={<div>Loading...</div>}>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Suspense>,
  document.getElementById("root")
);
