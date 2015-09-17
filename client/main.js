import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/lib/createBrowserHistory";
import Router from "react-router";
import log from "loglevel";

import routes from "./routes";

log.setLevel("debug");

ReactDOM.render(<Router history={createBrowserHistory()}>{routes}</Router>, document.getElementById("react-main-mount"))
