import React from "react";
import find from "lodash/collection/find";

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
        // TODO: remove that and create an action for single request
    };

    // Bindings
    this.onAnimeUpdated = this.onAnimeUpdated.bind(this);
    this.deleteAnime = this.deleteAnime.bind(this);
    this.editAnime = this.editAnime.bind(this);
  }

  onAnimeUpdated(payload) {
    var anime = find(payload, {
      slug: this.props.params.anime
    });

    this.setState({
      anime: anime
    });

    if(payload.status === 200) {
      this.context.router.transitionTo("/");
    }
  }

  componentDidMount() {
    this.unsubscribe = AnimeStore.listen(this.onAnimeUpdated);
    AnimeActions.refreshStore();
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
