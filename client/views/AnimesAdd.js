import React from "react";

// Stores
import AnimeStore from "../stores/AnimeStore";

// Actions
import AnimeActions from "../actions/AnimeActions";

export default class AnimesAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    // Bindings
    this.onAnimeUpdated = this.onAnimeUpdated.bind(this);
    this.addAnime = this.addAnime.bind(this);
  }

  onAnimeUpdated(data) {
    this.setState({
      data: data
    });
  }

  componentDidMount() {
    this.unsubscribe = AnimeStore.listen(this.onAnimeUpdated);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addAnime(e) {
    e.preventDefault();
    var anime = {
      title: this.refs.title.value.trim(),
      year: this.refs.year.value.trim(),
      synopsis: this.refs.synopsis.value.trim()
    };
    AnimeActions.addAnime(anime, this.props.history);
  }

  render() {
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input ref="title" id="title" type="text" className="validate"/>
              <label htmlFor="title">Title</label>
            </div>
            <div className="input-field col s12">
              <input ref="year" id="year" type="number" className="validate"/>
              <label htmlFor="year">Release year</label>
            </div>
            <div className="input-field col s12">
              <input ref="synopsis" id="synopsis" type="text" className="validate"/>
              <label htmlFor="synopsis">Synopsis</label>
            </div>
          </div>
          <button className="btn waves-effect waves-light" onClick={this.addAnime}>Add</button>
        </form>
      </div>
    );
  }
}
