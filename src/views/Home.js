import React from "react";
import {Link} from "react-router";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Link to="animes">Anime</Link>
        <br/>
        <Link to="anime" params={{animeId: "0"}}>Test</Link>
      </div>
    );
  }
}
