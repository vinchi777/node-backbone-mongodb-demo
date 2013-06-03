var mongoose = require('mongoose');

var quoteSchema = mongoose.Schema({
	hero: String,
	quote: String,
	time: {type: Date, default: Date.now}
	//user: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

mongoose.model('Quote', quoteSchema)
