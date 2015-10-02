import React from "react";
// import moment from "moment";

import AnimeActions from "../actions/AnimeActions";

export default class Episode extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.deleteEpisode = this.deleteEpisode.bind(this);
    this.episodeSeen = this.episodeSeen.bind(this);
    this.removeEpisodeSeen = this.removeEpisodeSeen.bind(this);
  }

  deleteEpisode() {
    AnimeActions.deleteEpisode(this.props.animeSlug, this.props.episode.number);
  }

  episodeSeen() {
    AnimeActions.episodeSeen(this.props.animeSlug, this.props.episode.number);
  }

  removeEpisodeSeen() {
    AnimeActions.removeEpisodeSeen(this.props.animeSlug, this.props.episode.number);
  }

  render() {
    return (
      <div>
        <div className="episode">
          <div className="episode--number"><span>{this.props.episode.number}</span></div>
          <div className="episode--title">{this.props.episode.title} {/* moment(this.props.episode.airDate).format("MMM Do YYYY")*/}</div>
          <button className="btn waves-effect waves-light" onClick={this.deleteEpisode}>Delete</button>
          <button className="btn waves-effect waves-light" onClick={this.episodeSeen}>Seen</button>
          <button className="btn waves-effect waves-light" onClick={this.removeEpisodeSeen}>Un-See</button>
        </div>
      </div>
    );
  }
}

Episode.propTypes = {
  animeSlug: React.PropTypes.number.isRequired,
  episode: React.PropTypes.object.isRequired
};
