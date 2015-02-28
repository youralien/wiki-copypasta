/**
* Includes all the routes in the app
* routes are case and endslash sensitive
* Some routes are repeated with endslash
* for user convenience.
*
* Note App is the root of all pages rendered,
* Though it doesn't have to be configured in this way 
* for all react-router websites.
*/

'use strict';

var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

/* Components */
var App         = require('./components/App.jsx');
var Index       = require('./components/Index.jsx');
var Place       = require('./components/Place.jsx');
var Article     = require('./components/Article.jsx');
var ArticleList = require('./components/ArticleList.jsx');
var NotFound    = require('./components/NotFound.jsx');
var Edit        = require('./components/Edit.jsx')

var routes = (
  <Route name="places" path="/" handler={App}>
    <DefaultRoute name="index" handler={Index} />
    <Route name="place" path="place/:id" handler={Place} />
    <Route name="articleList" path="articles" handler={ArticleList} />
    <Route name="article" path="article/:id" handler={Article} />
    <Route name="articleslash" path="article/:id/" handler={Article} /> //TODO: Replace hotfix with more generalized system
    <Route name='edit' path='article/:id/edit' handler={Edit} />
    <NotFoundRoute name="notfound" handler={ NotFound }/>
  </Route>
);
/*     <Route name="edit" path="article/:id/edit" handler={Edit} /> */


module.exports = routes;
