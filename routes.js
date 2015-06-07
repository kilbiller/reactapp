import React from "react";
import {
  Route, DefaultRoute
}
from "react-router";

import Home from "./src/views/Home";
import Animes from "./src/views/Animes";
import Anime from "./src/views/Anime";
import App from "./src/views/App";
import AddAnime from "./src/views/AddAnime";

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Home}/>
    <Route path="/animes" handler={Animes}/>
    <Route path="/animes/:animeId" handler={Anime}/>
    <Route path="/addanime" handler={AddAnime}/>
  </Route>
);

export default routes;
