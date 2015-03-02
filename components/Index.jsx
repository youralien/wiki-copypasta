/*
* Default content route in accordance with routes.jsx
* Contains HTML welcome mat for entrance to Pastapedia
* and link to edit page (as prompt to create new article)
*/

'use strict';
var React = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');


var Index = React.createClass({
  render: function () {
    return (
      <DocumentTitle title="Pastapedia, the Copypasta Wiki">
        <div className = "index">
        	<div className = "indextitle">
	        	<h2>Welcome to Pastapedia!</h2>
        	</div>
        	<div className = "indexcontent">
	        	<p>Come for the copy, stay for the pastas.</p>
        	</div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = Index;