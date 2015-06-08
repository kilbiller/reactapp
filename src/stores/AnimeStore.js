import Reflux from "reflux";

import AnimeActions from "../actions/AnimeActions";

export default Reflux.createStore({
  init: function() {
    this.listenToMany(AnimeActions);
    this.animes = [];
  },
  onRefreshStore: function() {
    console.log("Refreshing store...");
  },
  onRefreshStoreCompleted: function(data) {
    console.log("Store refreshed.");
    this.animes = JSON.parse(data);
    this.trigger(this.animes);
  },
  onRefreshStoreFailed: function() {
    console.log("Error during refreshing.");
  },
  onAddAnime: function() {
    console.log("Adding an anime...");
  },
  onAddAnimeCompleted: function(data) {
    console.log("Anime Added.");
    this.trigger(JSON.parse(data));
  },
  onAddAnimeFailed: function() {
    console.log("Error during addAnime.");
  }
});
