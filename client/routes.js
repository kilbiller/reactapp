import React from "react";
import {
  Route, DefaultRoute
}
from "react-router";

import Home from "./views/Home";
import Animes from "./views/Animes";
import AnimesShow from "./views/AnimesShow";
import App from "./views/App";
import AnimesAdd from "./views/AnimesAdd";
import Register from "./views/Register";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Calendar from "./views/Calendar";

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Home}/>
    <Route path="/animes" handler={Animes}/>
    <Route path="/animes/:slug" handler={AnimesShow}/>
    <Route path="/addanime" handler={AnimesAdd}/>
    <Route path="/register" handler={Register}/>
    <Route path="/login" handler={Login}/>
    <Route path="/logout" handler={Logout}/>
    <Route path="/calendar" handler={Calendar}/>
  </Route>
);

export default routes;
