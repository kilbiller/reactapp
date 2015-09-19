import React from "react";

// Stores
import AnimeStore from "../stores/AnimeStore";

// Actions
import AnimeActions from "../actions/AnimeActions";

// Components
import AnimeDetails from "../components/AnimeDetails";

export default class AnimesShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anime: null
    };

    // Bindings
    this.onAnimeUpdated = this.onAnimeUpdated.bind(this);
    this.deleteAnime = this.deleteAnime.bind(this);
    this.editAnime = this.editAnime.bind(this);
    this.addToList = this.addToList.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = AnimeStore.listen(this.onAnimeUpdated);
    AnimeActions.getAnime(this.props.params.slug);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onAnimeUpdated(anime) {
    this.setState({
      anime: anime
    });
  }

  deleteAnime() {
    AnimeActions.deleteAnime(this.state.anime.slug, this.props.history);
  }

  editAnime() {

  }

  addToList() {
    AnimeActions.addAnimeToList(this.state.anime.slug);
  }

  removeFromList() {
    AnimeActions.removeAnimeFromList(this.state.anime.slug);
  }

  render() {
    let anime;
    if(this.state.anime) {
      anime = (
        <div>
          <button className="btn waves-effect waves-light" onClick={this.deleteAnime}>Delete</button>
          &nbsp;
          <button className="btn waves-effect waves-light" onClick={this.editAnime}>Edit</button>
          &nbsp;
          <button className="btn waves-effect waves-light" onClick={this.addToList}>Add to list</button>
          &nbsp;
          <button className="btn waves-effect waves-light" onClick={this.removeFromList}>Remove from List</button>
          <AnimeDetails anime={this.state.anime}/>
        </div>
      );
    }
    return (
      <div>
        {anime}
      </div>
    );
  }
}
