import React from "react";
import {Paper} from "material-ui";


export default class Anime extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="row center-xs">
            <div className="col-md-7">
              <Paper zDepth={1}>
                <h1>{this.props.anime.title}</h1>
                <img src={this.props.anime.image}/>
                <p>{this.props.anime.synopsis}</p>
              </Paper>
            </div>
          </div>;
  }
}
