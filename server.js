'use strict';

// enables JSX requires
require('node-jsx').install({ extension: '.jsx' });

/**
 * This file provided by Facebook is for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

 /**
 * server.js
 * run using "node server.js"
 * imports all packages, and includes all routes of website
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

app.listen(3000);

console.log('Server started: http://localhost:3000/');
