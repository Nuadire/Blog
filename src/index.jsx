import "antd/dist/antd.css";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./_helpers";
import { App } from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "./styles/style.scss";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
