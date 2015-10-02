import React from "react";
import {
  Route, IndexRoute
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
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="animes" component={Animes}/>
    <Route path="animes/:slug" component={AnimesShow}/>
    <Route path="addanime" component={AnimesAdd}/>
    <Route path="register" component={Register}/>
    <Route path="login" component={Login}/>
    <Route path="logout" component={Logout}/>
    <Route path="calendar" component={Calendar}/>
  </Route>
);

export default routes;
