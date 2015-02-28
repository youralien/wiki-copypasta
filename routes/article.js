var Article = require('../models/ArticleModel');
var errorHandler = require('./errorHandler');

var listArticles = function(req, res) {
	Article
	.find({})
	.select('name')
	.sort('createdOn')
	.exec(function(err, articles) {
		if (err) errorHandler(err, req, res);
		res.status(200).json(articles);
	});
};

var getArticle = function(req, res) {
	var name = req.params.id;
	console.log('...'+name);
	Article
	.findOne({'name': name}, function(err, article) {
		if (err) errorHandler(err, req, res);
		res.status(200).json({'article': article});
	});
}
var editArticle = function(req, res) {
	var name = req.params.id;
	console.log('id: '+name);
	console.dir(req.params)
	console.dir(req.body);
	console.log(req.body.name);
	console.log(req.body.text);
	Article.findOne({name: name}, function(err, article) {
		if (err) errorHandler(err, req, res);
		if (article) {
			Article.update(
				{name: name},
				{
					name: req.body.name,
					text: req.body.text,
				},
				function(err, article) {
					res.status(200).json(article);
				});
		}
		else {
			var newArticle = new Article({
				name: name, 
				text: req.body.text
			})

			newArticle.save(function(err, article, numAffected) {
				if (err || (numAffected !== 1)) errorHandler(err, req, res);
				res.status(200).json({'article': article});
			});
		}
	});

	// Article
	// .findOneAndUpdate(
	// 	{name: name},
	// 	{
	// 		name: name,
	// 		text: req.body.text,
	// 		// tags: req.body.tags
	// 	},
	// 	{upsert: true},
	// 	function(err, article) {
	// 		console.log('article: ', article)
	// 		if (err) errorHandler(err, req, res);
	// 		res.status(200).json({'article': article});
	// 	}
	// );
};

module.exports.list = listArticles;
module.exports.get = getArticle;
module.exports.edit = editArticle;