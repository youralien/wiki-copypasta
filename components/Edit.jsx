'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var Showdown      = require('showdown');

var NotFound      = require('./NotFound.jsx');

var converter = new Showdown.converter();

var MarkdownEditor = React.createClass({
  mixins: [Router.State],

  getInitialState: function() {
    return {value: 'Type some *markdown* here!'};
  },
  handleChange: function() {
    this.setState({value: this.refs.text.getDOMNode().value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.refs.name.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !name) {
      return;
    }
    $.post(
      '/article/'+name+'/edit',
      {name: name, text: text},
      function(data) {
        console.log(JSON.stringify(data));
      }
    );
    // this.props.onCommentSubmit({name: name, text: text});
    this.refs.name.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
  },

  // TODO: Make Preview Scrollable, so you can view the live edits of the article below
  //       http://stackoverflow.com/questions/11298093/css-force-child-element-to-fit-into-parent-element
  render: function() {
    return (
      <DocumentTitle title={ this.getParams().id }>
      <form className="MarkdownEditor" onSubmit={this.handleSubmit}>
        <h3>Input</h3>
        <input ref='name' value={ this.getParams().id }/>
        <textarea
          onChange={this.handleChange}
          ref="text"
          defaultValue={this.state.value} />
        <input type="submit" value="Post" />
        <h3>Preview</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(this.state.value)
          }}
        />
      </form>
      </DocumentTitle>
    );
  }
});

// var PreviewButton = React.createClass({
//   handleClick: function(event) {

//   },
//   render: function() {
//     return (
//       <button onClick={this.handleClick}>
//         Preview Edits
//       </button>
//     );
//   }
// });

module.exports = MarkdownEditor;


// var EditForm = React.createClass({
//   handleSubmit: function(e) {
//     e.preventDefault();
//     var name = this.refs.name.getDOMNode().value.trim();
//     var text = this.refs.text.getDOMNode().value.trim();
//     if (!text || !name) {
//       return;
//     }
//     $.post(
//       '/article/'+name+'/edit',
//       {name: name, text: text},
//       function(data) {
//         console.log(data.article.name);
//       }
//     );
//     // this.props.onCommentSubmit({name: name, text: text});
//     this.refs.name.getDOMNode().value = '';
//     this.refs.text.getDOMNode().value = '';
//   },
//   render: function() {
//     return (
//       <form className="commentForm" onSubmit={this.handleSubmit}>
//         <input type="text" placeholder="Article name" ref="name" />
//         <textarea type="text" placeholder="Compose an article..." ref="text" />
//         <input type="submit" value="Post" />
//       </form>
//     );
//   }
// });

// module.exports = EditForm;