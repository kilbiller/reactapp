import React from "react";
//import _ from "lodash";

// Stores
//import AnimeStore from "../stores/AnimeStore";

// Actions
//import AnimeActions from "../actions/AnimeActions";

// Components
//import AnimeDetails from "../components/AnimeDetails";

export default class Anime extends React.Component {
  constructor(props) {
    super(props);
    /*this.state = {
      animes: AnimeStore.animes
    };*/

    // Bindings
    //this.onAnimeUpdated = this.onAnimeUpdated.bind(this);
  }

  /*onAnimeUpdated(animes) {
    this.setState({
      animes: animes
    });
  }

  componentDidMount() {
    this.unsubscribe = AnimeStore.listen(this.onAnimeUpdated);
    AnimeActions.refreshStore();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }*/

  render() {
    return(
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s8">
              <input id="title" type="text" className="validate"/>
              <label htmlFor="title">Title</label>
            </div>
          </div>
          <button type="button" className="btn waves-effect waves-light">Add</button>
        </form>
      </div>
    );
  }
}
