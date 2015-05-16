import React from "react";
import Router, {Route, DefaultRoute, RouteHandler} from "react-router";

// Views
import Home from "./views/Home";
import Header from "./views/Header";
import Animes from "./views/Animes";
import Anime from "./views/Anime";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container-fluid">
          <RouteHandler {...this.props}/>
        </div>
      </div>
    );
  }
}

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Home}/>
    <Route name="animes" path="/anime" handler={Animes}/>
    <Route name="anime" path="/anime/:animeId" handler={Anime}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/>, document.body);
});
