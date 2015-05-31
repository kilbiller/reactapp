import React from "react";

export default class Episode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <div className="episode">
          <div className="episode--number"><span>{this.props.episode.number}</span></div>
          <div className="episode--title"><span>{this.props.episode.title}</span></div>
          <div className="episode--actions"><span><button label="Seen" /></span></div>
        </div>
      </div>
    );
  }
}
