import Reflux from "reflux";
import log from "loglevel";
import find from "lodash/collection/find";

import AnimeActions from "../actions/AnimeActions";

export default Reflux.createStore({
  init: function() {
    this.listenToMany(AnimeActions);
    this.animes = [];

    this.getAnimeBySlug = function(slug) {
      var anime = find(this.animes, {
        slug: slug
      });
      return anime;
    };
  },
  onGetAnimes: function() {
    log.info("Getting all animes...");
  },
  onGetAnimesCompleted: function(payload) {
    log.info("All animes loaded.");
    this.animes = payload;
    this.trigger(this.animes);
  },
  onGetAnimesFailed: function(payload) {
    log.error("Error during getAnimes : " + payload.error);
  },
  onGetAnime: function() {
    log.info("Getting an anime...");
  },
  onGetAnimeCompleted: function(payload) {
    log.info("Anime loaded.");
    this.trigger(payload);
  },
  onGetAnimeFailed: function(payload) {
    log.error("Error during getAnime : " + payload.error);
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
