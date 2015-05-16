import React from "react";
import {
  Paper, RaisedButton
}
from "material-ui";

export default class Episode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Paper zDepth={1} className="episode">
          <div className="episode--number"><span>{this.props.episode.number}</span></div>
          <div className="episode--title"><span>{this.props.episode.title}</span></div>
          <div className="episode--actions"><span><RaisedButton label="Seen" /></span></div>
        </Paper>
      </div>
    );
  }
}
