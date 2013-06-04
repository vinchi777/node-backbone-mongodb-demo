var mongoose = require('mongoose')
	,Quote = mongoose.model('Quote');

exports.index = function(req, res){
	Quote.find({},function(e, quotes){
		console.log("quotes: " + quotes.quote)
		res.render('quotes/index', {title: 'Quotes', quotes: quotes})
	});
}

exports.create = function(req, res){
	console.log("req.body : " + req.body.quote);
	var quote = new Quote({hero: req.body.hero, quote: req.body.quote })
	quote.save();
	res.json(quote);
}

exports.destroy = function(req, res){
	console.log("id: " + req.params.id);
	Quote.find({ _id: req.params.id }).remove();
	res.json({ message: "deleted" });
}
