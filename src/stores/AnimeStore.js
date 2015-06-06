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
  onRefreshStoreCompleted: function(text) {
    console.log("Store refreshed.");
    this.animes = JSON.parse(text);
    this.trigger(this.animes);
  },
  onRefreshStoreFailed: function() {
    console.log("Error during refreshing.");
  }
});
