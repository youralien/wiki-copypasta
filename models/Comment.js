var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	author: String,
	text: String,
	createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('comment', commentSchema);