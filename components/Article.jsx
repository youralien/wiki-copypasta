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

  render: function () {

    var article = findWikiPage(this.getParams().id);

    if (!article) return <NoArticle />; //instead renders page as "no article found", etc., in accordance with NoArticle.jsx

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
