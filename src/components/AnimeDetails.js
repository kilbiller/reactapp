import React from "react";
import {Paper} from "material-ui";


export default class Anime extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
            <Paper zDepth={1} className="episodesList">
              <h2>Episodes</h2>
              <p>test</p>
            </Paper>
          </Paper>
        </div>
      </div>
    );
  }
}
