import Reflux from "reflux";
import log from "loglevel";
import find from "lodash/collection/find";

import AnimeActions from "../actions/AnimeActions";

export default Reflux.createStore({
  init: function() {
    this.listenToMany(AnimeActions);
    this.animes = [];
    this.anime = null;

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
    log.error("Error : " + payload.error);
  },
  onGetAnime: function() {
    log.info("Getting an anime...");
  },
  onGetAnimeCompleted: function(payload) {
    log.info("Anime loaded.");
    this.trigger(payload);
  },
  onGetAnimeFailed: function(payload) {
    log.error("Error : " + payload.error);
  },
  onAddAnime: function() {
    log.info("Adding an anime...");
  },
  onAddAnimeCompleted: function(payload, router) {
    log.info("Anime Added.");
    router.transitionTo("/animes/" + payload.slug);
  },
  onAddAnimeFailed: function(payload) {
    log.error("Error : " + payload.error);
  },
  onDeleteAnime: function() {
    log.info("Deleting an Anime...");
  },
  onDeleteAnimeCompleted: function(payload, router) {
    log.info("Anime Deleted.");
    router.transitionTo("/");
  },
  onDeleteAnimeFailed: function(payload) {
    log.error("Error : " + payload.error);
  },
  onDeleteEpisode: function() {
    log.info("Deleting an Episode...");
  },
  onDeleteEpisodeCompleted: function(payload) {
    log.info("Episode Deleted.");
    this.trigger(payload.anime);
  },
  onDeleteEpisodeFailed: function(payload) {
    log.error("Error : " + payload.error);
  },
  onAddEpisode: function() {
    log.info("Adding an episode...");
  },
  onAddEpisodeCompleted: function(payload) {
    log.info("Episode Added.");
    this.trigger(payload.anime);
  },
  onAddEpisodeFailed: function(payload) {
    log.error("Error : " + payload.error);
  },
  onAddAnimeToList: function() {
    log.info("Adding anime to list...");
  },
  onAddAnimeToListCompleted: function(payload) {
    log.info("Anime added to list.");
    //this.trigger(payload.anime);
  },
  onAddAnimeToListFailed: function(payload) {
    log.error("Error : " + payload.error);
  },
  onRemoveAnimeFromList: function() {
    log.info("Removing anime from list...");
  },
  onRemoveAnimeFromListCompleted: function(payload) {
    log.info("Anime removed from list.");
    //this.trigger(payload.anime);
  },
  onRemoveAnimeFromListFailed: function(payload) {
    log.error("Error : " + payload.error);
  },
  onEpisodeSeen: function() {
    log.info("Marking an episode as seen...");
  },
  onEpisodeSeenCompleted: function(payload) {
    log.info("Episode marked as seen.");
    //this.trigger(payload.anime);
  },
  onEpisodeSeenFailed: function(payload) {
    log.error("Error : " + payload.error);
  },
  onRemoveEpisodeSeen: function() {
    log.info("Marking an episode as unseen...");
  },
  onRemoveEpisodeSeenCompleted: function(payload) {
    log.info("Episode marked as unseen.");
    //this.trigger(payload.anime);
  },
  onRemoveEpisodeSeenFailed: function(payload) {
    log.error("Error : " + payload.error);
  }
});
