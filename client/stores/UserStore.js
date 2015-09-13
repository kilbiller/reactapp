import Reflux from "reflux";
import log from "loglevel";
import Cookies from "js-cookie";

import UserActions from "../actions/UserActions";

import history from "../history";

export default Reflux.createStore({
  init: function() {
    this.listenToMany(UserActions);
    this.user = null;

    this.isLoggedIn = function() {
      if(Cookies.set("token")) {
        return true;
      }
      return false;
    };
  },
  onRegister: function() {
    log.info("Registering User...");
  },
  onRegisterCompleted: function(payload) {
    log.info("Registration successful.");
    this.user = payload.user;
    Cookies.set("token", payload.token);
    history.replaceState(null, "/");
  },
  onRegisterFailed: function(payload) {
    log.error("Error : " + payload.error);
  },
  onLogin: function() {
    log.info("Login User...");
  },
  onLoginCompleted: function(payload) {
    log.info("Login successful.");
    this.user = payload.user;
    Cookies.set("token", payload.token);
    history.replaceState(null, "/");
  },
  onLoginFailed: function(payload) {
    log.error("Error : " + payload.error);
  },
  onLogout: function() {
    log.info("Login out...");
  },
  onLogoutCompleted: function() {
    log.info("Logout successful.");
    Cookies.remove("token");
    history.replaceState(null, "/");
  }
});
