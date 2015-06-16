import React from "react";
import Router from "react-router";
import log from "loglevel";

import routes from "./routes";

log.setLevel("debug");

var router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});

router.run(function(Root, state) {
  var params = state.params;
  React.render(<Root params={params}/>, document.getElementById("react-main-mount"));
});

/*Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  var params = state.params;
  log.debug(params);
  React.render(<Handler params={params}/>, document.getElementById("react-main-mount"));
});*/
