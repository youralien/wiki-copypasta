var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
	name: String,
	text: String,
	tags: [String]
});

module.exports = mongoose.model('wikiarticle', articleSchema);