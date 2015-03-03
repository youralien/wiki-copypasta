'use strict';

// enables JSX requires
require('node-jsx').install({ extension: '.jsx' });

 /**
 * server.js
 * run using "./scripts/dev" or "node server.js"
 * imports all express packages, starts database,
 * includes all api routes of website and well as
 * the link to the react-router server instance
 */

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var serverRender = require('./serverRenderer.jsx');
var comment = require('./routes/comment');
var article = require('./routes/article');
var app = express();

// mongoose database
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// API calls
app.get('/comments', comment.list);
app.post('/comments', comment.add);
app.get('/article/:id/json', article.get);
app.post('/article/:id/edit', article.edit);
app.get('/list/articles/json', article.list);

// App with fancy rendering
app.use('/', serverRender);

// app.use('/', express.static(path.join(__dirname, 'public')));

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});

console.log('Server started: http://localhost:3000/');
