import Reflux from "reflux";

import TestActions from "../actions/TestActions";

export default Reflux.createStore({
  init: function() {
    this.listenToMany(TestActions);
    this.list = [{
      name: "test1"
    }, {
      name: "test2"
    }];
  },
  onTestDelete: function(id) {
    this.list.splice(id, 1);
    this.trigger(this.list);
  },
  onTestDeleteAll: function() {
    this.list = [];
    this.trigger(this.list);
  }
});
