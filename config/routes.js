module.exports = function(app){

	var pages = require('../app/controllers/pages')

	var users = require('../app/controllers/users')
	app.get('/login', users.login)
	app.get('/signup', users.signup)
	app.get('/users/show', users.show)
	app.get('/users/session', users.session)

	var quote = require('../app/controllers/quotes')
	app.get('/', quote.index)
	app.post('/quote', quote.create)
}
