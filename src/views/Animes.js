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
    return(
      <div>
        {this.state.animeData.map(function(anime, index) {
          return <AnimeDetails anime={anime} key={index}/>;
        })}
      </div>
    );
  }
}
