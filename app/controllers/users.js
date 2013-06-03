var mongoose = require('mongoose')
	,User = mongoose.model('User');

exports.login = function(req, res){
	res.render('users/login');
}

exports.signup = function(req, res){
	res.render('users/signup');
}

exports.show = function(req, res){
	User.findOne({name: 'mario'}, function(err, user){
		res.render('users/show', {user: user, message: 'hello'});
	})
}

exports.session = function(req, res){
	var message = "Saved"
	var user = new User({name: 'mario', password: 'password'})
	user.save()
	res.render('users/show', {user: user, message: message})
}
