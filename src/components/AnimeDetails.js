import React from "react";
import {
  Paper
}
from "material-ui";

// Components
import Episode from "./Episode";

export default class AnimeDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var episodes = this.props.anime.episodes.map(function(episode, index) {
      return <Episode episode={episode} key={index}/>;
    });

    return(
      <div className="row center-md">
        <div className="col-md-10">
          <Paper zDepth={1} className="animeDetails">
            <div className="animeDetails--title">
              <h2>{this.props.anime.title}</h2>
            </div>
            <div className="row">
              <div className="col-md-3">
                <img src={this.props.anime.image}/>
              </div>
              <div className="col-md-7">
                <div className="row">
                  <h3>Synopsis</h3>
                </div>
                <div className="row">
                  <p>{this.props.anime.synopsis}</p>
                </div>
              </div>
            </div>
            <div className="episodesList">
              <div className="episodesList--title">
                <h2>Episodes 0/{this.props.anime.episodes.length}</h2>
              </div>
              {episodes}
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
