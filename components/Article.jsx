/*
* Main code for rendering the wiki article itself
* uses findWikiPage to grab the page from the database,
* then returns article body in HTML
*/

'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var Showdown      = require('showdown');


var converter = new Showdown.converter();

var Article = React.createClass({
  mixins: [ Router.State ],
  loadArticlesFromServer: function() {
    $.ajax({
      url: '/article/'+this.getParams().id+'/json',
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
    return {data: {}};
  },
  componentDidMount: function() {
    this.loadArticlesFromServer();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    var edittext = "Edit article"
    var rawMarkup = "finding content"
    if (this.state.data.article) {
      rawMarkup = converter.makeHtml(this.state.data.article.text.toString())
    }
    else {
      rawMarkup = "No Article Found!"
      edittext = "Create new article?"
    }

    return (
      <DocumentTitle title ={ this.getParams().id+" - Pastapedia" }>
        <div className="article">
          <div className="articletitle">
            <h2>{ this.getParams().id }</h2>
          </div>
          <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
          <a href={this.getParams().id+"/edit"}>{edittext}</a>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = Article;
