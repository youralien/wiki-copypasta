/**
 * Basic 404 page, improved by being within a template
 */

'use strict';
var React = require('react');

var NotFound = React.createClass({
  render: function () {
    return <p>404 Not Found</p>;
  }
});

module.exports = NotFound;