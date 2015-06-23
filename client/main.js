import React from "react";
import Router from "react-router";
import log from "loglevel";

import routes from "./routes";

log.setLevel("debug");

Router.run(routes, Router.HistoryLocation, function(Root, state) {
  var params = state.params;
  React.render(<Root params={params}/>, document.getElementById("react-main-mount"));
});
