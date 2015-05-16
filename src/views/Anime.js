import React from "react";

// Stores
import AnimeStore from "../stores/AnimeStore";

// Actions
import AnimeActions from "../actions/AnimeActions";

// Components
import AnimeDetails from "../components/AnimeDetails";

export default class Anime extends React.Component {
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
    for (var i = 0; i < this.state.animes.length; i++) {
      if (this.state.animes[i].id === parseInt(this.props.params.animeId)) {
        return (<div><AnimeDetails anime={this.state.animes[i]}/></div>);
      }
    }
    return <h1>{this.props.params.animeId}</h1>;
  }
}
