var React = require("react");
var Router = require("react-router");
var routes = require("./routes");

var middleware = function(req, res) {
  var router = Router.create({
    location: req.url,
    routes: routes
  });
  router.run(function(Handler, state) {
    var html = React.renderToString(<Handler/>);
    /*res.render("index", {
      html: html
    });*/

    res.send(html);
  });
};

module.exports = middleware;
