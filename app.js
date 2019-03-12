/**
 * Main file for the application.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var enforce = require('express-sslify');
var fs = require("fs");
var fileIO = require('./fileIO');

var login = require('./routes/login');
var todo = require('./routes/todo');
var home = require('./routes/home');
var add = require('./routes/add');
var reading = require('./routes/reading');
var help = require('./routes/help');
var privacy = require('./routes/privacy');
var terms = require('./routes/terms');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
if(app.get('port') !== 3000) { app.use(enforce.HTTPS({trustProtoHeader: true})); }
app.use(express.favicon("public/images/favicon.ico"));
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

/*
 * routes 
 */
app.get('/', login.render); // login screen
app.get('/home/:userID', home.render); // home page
app.get('/toduwu', todo.render); // todo screen
app.get('/add/:userID', add.render); // add page
app.post('/add/:userID/send', add.send); // post request for adding a book
app.get('/help/:userID', help.render); // help screen
app.get('/reading/:userID/:bookID', reading.render); // reading screen
app.get('/privacy', privacy.render); // privacy policy
app.get('/terms',terms.render); // terms and conditions

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
