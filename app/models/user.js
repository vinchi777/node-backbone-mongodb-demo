var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	password: String
})

mongoose.model('User',userSchema)
