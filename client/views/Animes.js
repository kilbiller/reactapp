import React from "react";
import {
  Link
}
from "react-router";

// Stores
import AnimeStore from "../stores/AnimeStore";

// Actions
import AnimeActions from "../actions/AnimeActions";

export default class Animes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animes: AnimeStore.animes
    };

    // Bindings
    this.onAnimeUpdated = this.onAnimeUpdated.bind(this);
  }

  onAnimeUpdated(animes) {
    this.setState({
      animes: animes
    });
  }

  componentDidMount() {
    this.unsubscribe = AnimeStore.listen(this.onAnimeUpdated);
    AnimeActions.getAnimes();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.animes.map(function(anime, index) {
            return <li key={index}><Link to={"/animes/" + anime.slug}>{anime.title}</Link></li>;
          })}
        </ul>
      </div>
    );
  }
}
