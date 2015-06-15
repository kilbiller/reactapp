import Reflux from "reflux";
import log from "loglevel";

import AnimeActions from "../actions/AnimeActions";

export default Reflux.createStore({
  init: function() {
    this.listenToMany(AnimeActions);
    this.animes = [];
  },
  onRefreshStore: function() {
    log.info("Refreshing store...");
  },
  onRefreshStoreCompleted: function(payload) {
    log.info("Store refreshed.");
    this.animes = payload;
    this.trigger(this.animes);
  },
  onRefreshStoreFailed: function(payload) {
    log.error("Error during refreshing : " + payload.error);
  },
  onAddAnime: function() {
    log.info("Adding an anime...");
  },
  onAddAnimeCompleted: function(payload) {
    log.info("Anime Added.");
    this.trigger(payload);
  },
  onAddAnimeFailed: function(payload) {
    log.error("Error during addAnime : " + payload.error);
  },
  onDeleteAnime: function() {
    log.info("Deleting an Anime...");
  },
  onDeleteAnimeCompleted: function(payload) {
    log.info("Anime Deleted.");
    this.trigger(payload);
  },
  onDeleteAnimeFailed: function(payload) {
    log.error("Error during deleteAnime : " + payload.error);
  }
});
