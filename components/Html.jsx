/*
* Included in serverRenderer.jsx
* Contains HTML head for all webpages rendered
* Also includes base.css here
* Has its content set by passing in markup variable
*/

'use strict';
var React = require('react');

// <script type='application/javascript' src="/js/lib.js"></script>
// <script type='application/javascript' src="/js/main.js"></script>

// Handle the HTML rendering on the server
var Html = React.createClass({
render: function() {
  return (
      <html>
      <head>
        <title>{ this.props.title }</title>
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link rel="stylesheet" href="/css/base.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/JSXTransformer.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="/js/lib.js"></script>
        <script src="/js/main.js"></script>

      </head>
      <body dangerouslySetInnerHTML={{__html: this.props.markup}}></body>
      </html>
  );
}
});

module.exports = Html;
