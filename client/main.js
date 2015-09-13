import React from "react";
import ReactDOM from "react-dom";
import Router from "react-router";
import log from "loglevel";

import routes from "./routes";
import history from "./history";

log.setLevel("debug");

ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById("react-main-mount"))
