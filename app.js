
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var login = require('./routes/login');
var home = require('./routes/home');
var todo = require('./routes/todo');
var add = require('./routes/add');
var edit = require('./routes/edit');
var help = require('./routes/help');
var reading = require('./routes/reading');
var privacy = require('./routes/privacy');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', login.view);
app.get('/home/:userID', home.view);
app.get('/toduwu', todo.view);
app.get('/add/:userID', add.view);
app.post('/add/:userID', add.submit);
app.get('/edit/:userID', edit.view);
app.get('/help/:userID', help.view);
app.get('/reading/:userID', reading.view);
app.get('/privacy', privacy.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
