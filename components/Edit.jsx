'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var Showdown      = require('showdown');

var NotFound      = require('./NotFound.jsx');

var converter = new Showdown.converter();

var MarkdownEditor = React.createClass({
  mixins: [Router.State, Router.Navigation],
  
  getArticleFromServer: function() {
    $.ajax({
      url: '/article/' + this.getParams().id + '/json',
      dataType: 'json',
      success: function(data) {
        this.setState({
          name: data.article.name,
          text: data.article.text
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/article/' + this.getParams().id + '/edit', status, err.toString());
      }.bind(this)
    });
  },
  redirectPostEdit: function() {
    this.transitionTo('article', {id: this.getParams().id});
  },
  getInitialState: function() {
    return {name: '', text: ''};
  },
  componentDidMount: function() {
    this.getArticleFromServer();
  },
  handleChange: function() {
    this.setState({text: this.refs.text.getDOMNode().value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.refs.name.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !name) {
      return;
    }
    $.post(
      '/article/' + this.getParams().id + '/edit',
      {name: name, text: text},
      this.redirectPostEdit
    );
    this.refs.name.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
  },

  // TODO: Make Preview Scrollable, so you can view the live edits of the article below
  //       http://stackoverflow.com/questions/11298093/css-force-child-element-to-fit-into-parent-element
  render: function() {
    return (
      <DocumentTitle title={ this.getParams().id }>
      <form className="MarkdownEditor" onSubmit={this.handleSubmit}>
        <div className="articletitle">
          <h2 className='articletitle'>{ this.getParams().id }</h2>
        </div>
        <input type='hidden' ref='name' value={ this.getParams().id }/>
        <textarea
          onChange={this.handleChange}
          ref="text"
          value={this.state.text} />
        <input type="submit" value="Post" />
        <h3>Preview</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(this.state.text)
          }}
        />
      </form>
      </DocumentTitle>
    );
  }
});

module.exports = MarkdownEditor;