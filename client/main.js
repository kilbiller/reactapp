import React from "react";
import Router from "react-router";
import log from "loglevel";

import routes from "./routes";

log.setLevel("debug");

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/>, document.body);
});
