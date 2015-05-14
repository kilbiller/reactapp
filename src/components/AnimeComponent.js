import React from "react";
import {Paper} from "material-ui";


export default class Anime extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row center-md">
        <div className="col-md-8">
          <Paper zDepth={1}>
            <h1>{this.props.anime.title}</h1>
            <img src={this.props.anime.image}/>
            <p>{this.props.anime.synopsis}</p>
          </Paper>
        </div>
      </div>
    );
  }
}
