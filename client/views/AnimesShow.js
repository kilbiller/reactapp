import React from "react";
import log from "loglevel";

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
  }

  onAnimeUpdated(payload) {
    if(payload.action === "animeDeleted") {
      this.context.router.transitionTo("/");
    } else {
      this.setState({
        anime: payload
      });
    }
  }

  componentDidMount() {
    this.unsubscribe = AnimeStore.listen(this.onAnimeUpdated);
    AnimeActions.getAnime(this.props.params.slug);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  deleteAnime() {
    AnimeActions.deleteAnime(this.state.anime.title);
  }

  editAnime() {

  }

  render() {
    var anime;
    if(this.state.anime) {
      anime = (
        <div>
          <button className="btn waves-effect waves-light" onClick={this.deleteAnime}>Delete</button>
          &nbsp;
          <button className="btn waves-effect waves-light" onClick={this.editAnime}>Edit</button>
          <AnimeDetails anime={this.state.anime}/>
        </div>
      );
    }
    return(
      <div>
        {anime}
      </div>
    );
  }
}

AnimesShow.contextTypes = {
  router: React.PropTypes.func
};
