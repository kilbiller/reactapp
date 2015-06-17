import React from "react";

import AnimeActions from "../actions/AnimeActions";

export default class Episode extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.deleteEpisode = this.deleteEpisode.bind(this);
  }

  deleteEpisode() {
    AnimeActions.deleteEpisode(this.props.animeSlug, this.props.episode.number);
  }

  render() {
    return(
      <div>
        <div className="episode">
          <div className="episode--number"><span>{this.props.episode.number}</span></div>
          <div className="episode--title"><span>{this.props.episode.title}</span></div>
          <button className="btn waves-effect waves-light" onClick={this.deleteEpisode}>Delete</button>
        </div>
      </div>
    );
  }
}
