module.exports = function(app){

	var pages = require('../app/controllers/pages')

	var quote = require('../app/controllers/quotes')
	app.get('/', quote.index)
	app.post('/quotes', quote.create)
	app.delete('/quotes/:id', quote.destroy)
}
