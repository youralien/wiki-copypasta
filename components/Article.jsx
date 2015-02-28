/*
* Main code for rendering the wiki article itself
* uses findWikiPage to grab the page from the database,
* then returns article body in HTML
*/

'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var Link          = Router.Link;

// var Async         = require('react-async')
// var XMLHttpRequest= require("xmlhttprequest").XMLHttpRequest;
// var xhr = new XMLHttpRequest();
// var url = "json";

// var NoArticle     = require('./NoArticle.jsx'); 


//TODO: Change this to correctly query database
// function findWikiPage(id) {
//   var forcedarticle = {name: id, text: "Hi Fred", tags: ["Fred","Hi"]};
//   return forcedarticle
// }

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
    var links = "boo"
    if (this.state.data) {
      console.log(this.state.data)
      links = this.state.data
    }
    else {
      links = "We couldn't find your data"
    }
    // this.state.data.map(function(article) {
    //   return (
    //     <li>
    //       <Link to="article" params={{id: article.name}}>{article.name}</Link>
    //     </li>
    //   );
    // });
    return (
      <DocumentTitle title ={ this.getParams().id+" - Pastapedia" }>
        <div className="article">
          <div className="articletitle">
            <h2>{ this.getParams().id }</h2>
          </div>
          <p>{links}</p>
        </div>
      </DocumentTitle>
    );
  }
});
//   mixins: [ Router.State ], //used to get id of article, so as to find the correct article to render.

//   loadArticlesFromServer: function() {
//     $.ajax({
//       url: 'json',
//       dataType: 'json',
//       success: function(data) {
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },
//   getInitialState: function() {
//     return {data: {name: this.getParams().id, text: "No Article found", tags: []}};
//   },
//   componentDidMount: function() {
//     console.log("did mount")
//     this.loadArticleFromServer();
//     setInterval(this.loadArticleFromServer, 2000);
//   },

//   render: function () {

//     console.log(this.state.data);//return <h2>No Article Found!</h2>// <NoArticle />; //instead renders page as "no article found", etc., in accordance with NoArticle.jsx

//     // if (article.)

//     var tags = this.state.data.tags.map(function (tag) {
//       return (
//         <li key={"tag-" + tag}>
//           { tag }
//         </li>
//       );
//     });

//     return(
//       <DocumentTitle title ={ this.state.data.name }>
//         <div className = "article">
//           <div className="articletitle">
//             <h2>{ this.state.data.name }</h2>
//           </div>
//           <div className = "tagtitle">
//             Tags:
//           </div>
//           <div className = "tags">
//             { tags }
//           </div>
//           <div className="articlecontent">
//             <p>{ this.state.data.text }</p>
//           </div>
//         </div>
//       </DocumentTitle>
//     );
//   }
// });

module.exports = Article;
