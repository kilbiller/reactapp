import React from "react";

// Stores
import AnimeStore from "../stores/AnimeStore";

// Actions
import AnimeActions from "../actions/AnimeActions";

// Components
import AnimeDetails from "../components/AnimeDetails";

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
    AnimeActions.refreshStore();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return(
      <div>
        {this.state.animes.map(function(anime, index) {
          return <AnimeDetails anime={anime} key={index}/>;
        })}
      </div>
    );
  }
}
