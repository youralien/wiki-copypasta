/*
ArticleList is a react component which will render a list of existing article
links.  It depends on React-Router to handle client-side routing to these
particular article links. It has the following special methods:

  - loadArticlesFromServer - will make an ajax get request for the list of article names
 */

'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var Link          = Router.Link;

var ArticleList = React.createClass({
  loadArticlesFromServer: function() {
    $.ajax({
      url: '/list/articles/json',
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadArticlesFromServer();
    setInterval(this.loadCommentsFromServer, 10000);
  },
  render: function() {
    var links = this.state.data.map(function(article) {
      return (
        <li>
          <Link to="article" params={{id: article.name}}>{article.name}</Link>
        </li>
      );
    });
    return (
      <ul className="master">
        {links}
      </ul>
    );
  }
});

module.exports = ArticleList;