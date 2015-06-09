import React from "react";
import {
  Route, DefaultRoute
}
from "react-router";

import Home from "./src/views/Home";
import Animes from "./src/views/Animes";
import AnimesShow from "./src/views/AnimesShow";
import App from "./src/views/App";
import AnimesAdd from "./src/views/AnimesAdd";

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Home}/>
    <Route path="/animes" handler={Animes}/>
    <Route path="/animes/:anime" handler={AnimesShow}/>
    <Route path="/addanime" handler={AnimesAdd}/>
  </Route>
);

export default routes;
