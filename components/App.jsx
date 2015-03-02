/**
* Template for all react routes.
* Contains Title, and sidebar with links to 
* homepage and a list of all articles.
* 
* Includes <RouteHandler /> call for 
* insertion of the page-specific content.
*/

"use strict";

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var data  = require('../public/data/places');
var title = "Pastapedia, the Copypasta Wiki";

var App = React.createClass({

  getDefaultProps: function () {
    return { places: data };
  },

  render: function () {
    return (
      <DocumentTitle title={ title }>
        <div className="app">
          <h1 className='maintitle'>{ title }</h1>
          <ul className="master">
            <Link to="index"><img className="pasta-icon" src="/images/pasta-icon.png"></img></Link>
            <li><Link to="articleList">List of All Articles</Link></li>
          </ul>
          <div className="detail">
            <RouteHandler />
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = App;