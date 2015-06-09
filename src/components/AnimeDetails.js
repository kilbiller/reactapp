import React from "react";
import {
  Link
}
from "react-router";

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
      <div className="row">
        <div className="col s12">
          <div className="animeDetails">
            <div className="animeDetails--title">
              <h2><Link to={"/animes/" + this.props.anime.title}>{this.props.anime.title}</Link></h2>
            </div>
            <div className="row">
              <div className="col s4">
                <img src={this.props.anime.image}/>
              </div>
              <div className="col s8">
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
          </div>
        </div>
      </div>
    );
  }
}
