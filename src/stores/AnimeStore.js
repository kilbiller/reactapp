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
  onRefreshStoreCompleted: function(payload) {
    console.log("Store refreshed.");
    this.animes = JSON.parse(payload);
    this.trigger(this.animes);
  },
  onRefreshStoreFailed: function() {
    console.log("Error during refreshing.");
  },
  onAddAnime: function() {
    console.log("Adding an anime...");
  },
  onAddAnimeCompleted: function(payload) {
    console.log("Anime Added.");
    this.trigger(JSON.parse(payload));
  },
  onAddAnimeFailed: function() {
    console.log("Error during addAnime.");
  },
  onDeleteAnime: function() {
    console.log("Deleting an Anime...");
  },
  onDeleteAnimeCompleted: function(payload) {
    console.log("Anime Deleted.");
    this.trigger(JSON.parse(payload));
  },
  onDeleteAnimeFailed: function() {
    console.log("Error during deleteAnime.");
  }
});
