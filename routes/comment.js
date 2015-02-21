var Comment = require('../models/Comment');
var errorHandler = require('./errorHandler');

var listComments = function(req, res) {
	Comment
	.find({})
	.sort('createdOn')
	.exec(function(err, comments) {
		if (err) errorHandler(err, req, res);
		res.status(200).json(comments);
	});
};

var addComment = function(req, res) {
	comment;
	var newComment = new Comment(comment);

	newComment.save(function(err, comment, numAffected) {
		if (err || (numAffected !== 1)) errorHandler(err, req, res);
		listComments(req, res);
	});

};

module.exports.list = listComments;
module.exports.add = addComment;