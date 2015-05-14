import React from "react";
import Router, {Route, RouteHandler} from "react-router";
import {Paper, RaisedButton} from "material-ui";

// Stores
import AnimeStore from "./stores/AnimeStore";

// Actions
import AnimeActions from "./actions/AnimeActions";

// Components
import Anime from "./components/AnimeComponent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animeData: AnimeStore.data
    };

    // Bindings
    this.onAnimeUpdated = this.onAnimeUpdated.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }

  deleteAll() {
    AnimeActions.testDeleteAll();
  }

  onAnimeUpdated(data) {
    this.setState({
      animeData: data
    });
  }

  componentDidMount() {
    this.unsubscribe = AnimeStore.listen(this.onAnimeUpdated);
    AnimeActions.loadData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return <div>
      <Paper className="header" zDepth={0}>
        <h1>Header!!</h1>
      </Paper>
      {this.state.animeData.map(function(anime, index) {
        return <Anime anime={anime} key={index}/>;
      })}
        <RouteHandler/>
    </div>;
  }
}

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="about" path="about" handler={App}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
