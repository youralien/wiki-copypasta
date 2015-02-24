/*
* Displays when Article cannot find article in database
* Contains HTML text of wiki status,
* and link to edit page (as prompt to create new article)
*/

'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');


var NoArticle = React.createClass({
	mixins: [ Router.State ], 

	render: function () {
		var whee = this.getParams().id+'/edit';
		return(
			<DocumentTitle title ={ this.getParams().id }>
        <div className = "noarticle">
        	<div className = "noarticletitle">
	        	<h2>No Article Found!</h2>
        	</div>
        	<div className = "noarticlecontent">
	        	<p>We couldnt find an article for { this.getParams().id }.</p>

	        	<p><a href={whee}>Create a new article?</a></p>
        	</div>
        </div>
      </DocumentTitle>

		)
	}
});

module.exports = NoArticle;