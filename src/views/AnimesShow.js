import React from "react";
import _ from "lodash";

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
    var anime = _.find(payload, {
      title: this.props.params.anime
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
    if(this.state.anime) {
      return(
        <div>
          <button className="btn waves-effect waves-light" onClick={this.deleteAnime}>Delete</button>
           hello
          <button className="btn waves-effect waves-light" onClick={this.editAnime}>Edit</button>
          <AnimeDetails anime={this.state.anime}/>
        </div>
      );
    }

    return(
      <div>
        <h1>{this.props.params.anime}</h1>
      </div>
    );
  }
}

AnimesShow.contextTypes = {
  router: React.PropTypes.func
};
