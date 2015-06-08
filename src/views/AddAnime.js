import React from "react";
import {
  Link
}
from "react-router";

// Stores
import AnimeStore from "../stores/AnimeStore";

// Actions
import AnimeActions from "../actions/AnimeActions";

export default class Anime extends React.Component {
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
    //Materialize.toast('I am a toast!', 4000);
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
      title: React.findDOMNode(this.refs.title).value.trim(),
      synopsis: React.findDOMNode(this.refs.synopsis).value.trim()
    };
    AnimeActions.addAnime(anime);
  }

  render() {
    var flash;
    if(this.state.data) {
      flash = <div className="card-panel blue-grey">Anime created. <Link to={"/animes/" + this.state.data.id}>Link to ressource</Link></div>;
    }

    return(
      <div className="row">
        {flash}
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input ref="title" id="title" type="text" className="validate"/>
              <label htmlFor="title">Title</label>
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
