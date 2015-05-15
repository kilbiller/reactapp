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
    for (var i = 0; i < this.state.animeData.length; i++) {
      if (this.state.animeData[i].id === parseInt(this.props.params.animeId)) {
        return (<div><AnimeDetails anime={this.state.animeData[i]}/></div>);
      }
    }
    return <h1>{this.props.params.animeId}</h1>;
  }
}
