import Reflux from "reflux";
import log from "loglevel";
import Cookies from "js-cookie";

import UserActions from "../actions/UserActions";

export default Reflux.createStore({
  init: function() {
    this.listenToMany(UserActions);
    this.user = null;
  },
  onRegister: function() {
    log.info("Registering User...");
  },
  onRegisterCompleted: function(payload, router) {
    log.info("Registration successful.");
    this.user = payload.user;
    Cookies.set("token", payload.token);
    router.transitionTo("/");
  },
  onRegisterFailed: function(payload) {
    log.error("Error : " + payload.error);
  },
  onLogin: function() {
    log.info("Login User...");
  },
  onLoginCompleted: function(payload, router) {
    log.info("Login successful.");
    this.user = payload.user;
    Cookies.set("token", payload.token);
    router.transitionTo("/");
  },
  onLoginFailed: function(payload) {
    log.error("Error : " + payload.error);
  },
  onLogout: function() {
    log.info("Login out...");
  },
  onLogoutCompleted: function(router) {
    log.info("Logout successful.");
    Cookies.remove("token");
    router.transitionTo("/");
  }
});
