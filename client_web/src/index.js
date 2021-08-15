import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./utils/reportWebVitals";

import { Router } from "react-router-dom";
import { configStore } from "./store/configStore";
import { Provider } from "react-redux";
import { rootSaga } from "sagas";
import App from "./containers/App";
import { history } from "utils/history";

const store = configStore();
store.runSaga(rootSaga);

let mswWarnActive = false;
const mswWarnComponent = (
  <div className="bg-yellow-500 text-white text-center p-2">
    MSW Mock data active
  </div>
);
if (
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_ENABLE_BROWSER_MSW === "true"
) {
  const { worker } = require("./testing/mocks/browser");
  worker.start();
  mswWarnActive = true;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        {mswWarnActive && mswWarnComponent}
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
