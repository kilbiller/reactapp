import React from "react";
import {
  Route, DefaultRoute
}
from "react-router";

import Home from "./src/views/Home";
import Animes from "./src/views/Animes";
import Anime from "./src/views/Anime";
import App from "./src/views/App";

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Home}/>
    <Route name="animes" path="/anime" handler={Animes}/>
    <Route name="anime" path="/anime/:animeId" handler={Anime}/>
  </Route>
);

export default routes;
