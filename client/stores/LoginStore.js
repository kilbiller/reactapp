import Reflux from "reflux";
import log from "loglevel";
import Cookies from "js-cookie";

import LoginActions from "../actions/LoginActions";

export default Reflux.createStore({
  init: function() {
    this.listenToMany(LoginActions);
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
  onLogoutCompleted: function(payload, router) {
    log.info("Logout successful.");
    Cookies.remove("token");
    router.transitionTo("/");
  },
  onLogoutFailed: function(payload) {
    log.error("Error : " + payload.error);
  }
});
