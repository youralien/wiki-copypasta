var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
	name: String,
	text: String,
	tags: [String]
});

module.exports = mongoose.model('wikipage', pageSchema);