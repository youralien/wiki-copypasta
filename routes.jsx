'use strict';

var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

/* Components */
var App      = require('./components/App.jsx');
var Index    = require('./components/Index.jsx');
var Place    = require('./components/Place.jsx');
var Article  = require('./components/Article.jsx');
var NotFound = require('./components/NotFound.jsx');

var routes = (
  <Route name="places" path="/" handler={App}>
    <DefaultRoute name="index" handler={Index} />
    <Route name="place" path="place/:id" handler={Place} />
    <Route name="article" path="article/:id" handler={Article} />
    <NotFoundRoute name="notfound" handler={ NotFound }/>
  </Route>
);
/*     <Route name="edit" path="article/:id/edit" handler={Edit} /> */


module.exports = routes;
