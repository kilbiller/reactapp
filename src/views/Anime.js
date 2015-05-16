import React from "react";
import _ from "lodash";

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
    var anime = _.find(this.state.animes, {
      id: parseInt(this.props.params.animeId)
    });

    if(anime) {
      return(<div><AnimeDetails anime={anime}/></div>);
    }

    return <h1>{this.props.params.animeId}</h1>;
  }
}
