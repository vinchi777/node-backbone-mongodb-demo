
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , engine = require('ejs-locals')
  , fs = require('fs')
  , mongoose = require('mongoose')
  , path = require('path');

mongoose.connect('mongodb://localhost/test')
var app = express();

var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file){
	require(models_path + '/' + file)
})
// all environments
app.set('port', process.env.PORT || 3000);

app.engine('ejs', engine);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./config/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
