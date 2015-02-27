/*
* Main code for rendering the wiki article itself
* uses findWikiPage to grab the page from the database,
* then returns article body in HTML
*/

'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var NoArticle     = require('./NoArticle.jsx'); 


//TODO: Change this to correctly query database
function findWikiPage(id) {
  var forcedarticle = {name: id, text: "Hi Fred", tags: ["Fred","Hi"]};
  return null
}

var Article = React.createClass({
  mixins: [ Router.State ], //used to get id of article, so as to find the correct article to render.

  loadCommentsFromServer: function() {
    $.ajax({
      url: "json",
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
        this.render()
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
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, 2000); //TODO set 2000 dynamically, eg with this.props.pollInterval
  },
  componentWillMont: function() {
    this.data = {"article": null};
  },

  render: function () {

    
    var article = this.data;//findWikiPage(this.getParams().id);

    console.log(article);

    if (!article) return <NoArticle />; //instead renders page as "no article found", etc., in accordance with NoArticle.jsx

    // if (article.)

    var tags = article.tags.map(function (tag) {
      return (
        <li key={"tag-" + tag}>
          { tag }
        </li>
      );
    });

    return(
      <DocumentTitle title ={ article.name }>
        <div className = "article">
          <div className="articletitle">
            <h2>{ article.name }</h2>
          </div>
          <div className = "tagtitle">
            Tags:
          </div>
          <div className = "tags">
            { tags }
          </div>
          <div className="articlecontent">
            <p>{ article.text }</p>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = Article;
