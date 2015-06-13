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
    this.animes = payload;
    this.trigger(this.animes);
  },
  onRefreshStoreFailed: function(payload) {
    console.log("Error during refreshing : " + payload);
  },
  onAddAnime: function() {
    console.log("Adding an anime...");
  },
  onAddAnimeCompleted: function(payload) {
    console.log("Anime Added.");
    this.trigger(payload);
  },
  onAddAnimeFailed: function(payload) {
    console.log("Error during addAnime : " + payload.error);
  },
  onDeleteAnime: function() {
    console.log("Deleting an Anime...");
  },
  onDeleteAnimeCompleted: function(payload) {
    console.log("Anime Deleted.");
    this.trigger(payload);
  },
  onDeleteAnimeFailed: function(payload) {
    console.log("Error during deleteAnime : " + payload);
  }
});
