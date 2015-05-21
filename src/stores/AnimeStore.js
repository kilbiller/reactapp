import Reflux from "reflux";

import AnimeActions from "../actions/AnimeActions";

export default Reflux.createStore({
  init: function() {
    this.listenToMany(AnimeActions);
    this.animes = [];
  },
  onRefreshStore: function() {
    console.log("Loading ...");
  },
  onRefreshStoreCompleted: function(text) {
    console.log("Completed load");
    this.animes = JSON.parse(text);
    this.trigger(this.animes);
  },
  onRefreshStoreFailed: function() {
    console.log("Error during load");
  }
});
