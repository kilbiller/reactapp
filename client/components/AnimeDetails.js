import React from "react";

// Components
import Episode from "./Episode";

// Actions
import AnimeActions from "../actions/AnimeActions";

export default class AnimeDetails extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.addEpisode = this.addEpisode.bind(this);
  }

  componentDidMount() {
    $(".datepicker").pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  }

  addEpisode(e) {
    e.preventDefault();
    const episode = {
      title: this.refs.title.value.trim(),
      number: this.refs.number.value.trim(),
      airDate: this.refs.airDate.value.trim()
    };
    AnimeActions.addEpisode(this.props.anime.slug, episode);
  }

  render() {
    const self = this;
    const episodes = this.props.anime.episodes.map(function(episode, index) {
      return <Episode animeSlug={self.props.anime.slug} episode={episode} key={index}/>;
    });

    return (
      <div className="row">
        <div className="col s12">
          <div className="animeDetails">
            <div className="animeDetails--title">
              <h2>{this.props.anime.title}</h2>
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
            <div className="episodes">
              <div className="episodes--title">
                <h2>Episodes 0/{this.props.anime.episodes.length}</h2>
              </div>
              {episodes}
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <input ref="title" id="title" type="text" className="validate"/>
                      <label htmlFor="title">Title</label>
                    </div>
                    <div className="input-field col s12">
                      <input ref="number" id="number" type="number" className="validate"/>
                      <label htmlFor="number">Number</label>
                    </div>
                    <div className="input-field col s12">
                      <input ref="airDate" id="airDate" type="date" className="datepicker validate"/>
                      <label htmlFor="airDate">Airing Date</label>
                    </div>
                  </div>
                  <button className="btn waves-effect waves-light" onClick={this.addEpisode}>Add episode</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AnimeDetails.propTypes = {
  anime: React.PropTypes.object.isRequired
};
