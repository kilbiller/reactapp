import React from "react";
import {
  Link
}
from "react-router";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <div className="logo">
          <h1><Link to="/">AnimeList</Link></h1>
        </div>
      </header>
    );
  }
}
