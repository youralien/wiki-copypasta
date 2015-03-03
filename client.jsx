/*
client.jsx

In the ecosystem of an isomorphic react framework, client.jsx is the highest
level module in the hierarchy of client-side React and React-Router files and
components.  

After server-side rendering of the static components happens, client.jsx will
add event listeners once the DOM content is loaded in a re-rendering step.
This adds the dynamic reactivity one would expect to all the server-side
rendered components.
 */

/* global document */
"use strict";
/** @jsx React.DOM */
var React  = require('react');
var Router = require('react-router');
var routes = require('./routes.jsx');

document.addEventListener("DOMContentLoaded", function(event) {
    Router.run(routes, Router.HistoryLocation, function (Handler, state) {
      React.render(<Handler />, document.body);
    });
});
