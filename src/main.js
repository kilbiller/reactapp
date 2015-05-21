import React from "react";
import Router from "react-router";

import routes from "../routes";

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/>, document.body);
});
