
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var enforce = require('express-sslify');

var fileIO = require('./public/js/fileIO');
var login = require('./routes/login');
var todo = require('./routes/todo');
var add = require('./routes/add');
var edit = require('./routes/edit');
var help = require('./routes/help');
var privacy = require('./routes/privacy');
var terms = require('./routes/terms');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
//app.use(enforce.HTTPS({trustProtoHeader: true}));
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

app.get('/', login.view);
app.get('/home/:userID', (req, res) => {
  let data = require('./public/db/data.json');
	let bookdat;
	let enabled = true;
	let temp = data[req.params.userID];
	if(temp === undefined) {
		bookdat = "nonexist";
		enabled = false;
	}else{
		bookdat = data[req.params.userID][0]['book_count'];
	}
	res.render('home', {
		'userID': req.params.userID,
		'bookID': bookdat,
		'books': data[req.params.userID],
		'res': false,
		'enabled': enabled,
		'updated': false 
	});
});
app.get('/toduwu', todo.view);
app.get('/add/:userID', add.view);
app.post('/add/:userID/subs', (req, res) => {

  let counter = require('./public/db/counts.json');
  let locCount = ++counter["count"];
  let userID = req.params.userID;
  let session = {};
  let name = req.body.book;
  let page_num = req.body.pages;
  let time_per_page = req.body.time;
  let rest_time = req.body.break;
  //let num_rest = req.body.numBreaks;
  let reminder = req.body.reminder;

  session["ownerID"] = userID;
  session["name"] = name;
  session["page_num"]= page_num;
  session["time_per_page"] = time_per_page;
  session["rest_time"] = rest_time;
  //session["num_breaks"] = num_rest;
  session["reminder"] = reminder;
  session["book_count"] = locCount;
  session["active"] = 1;

  counter["count"] = locCount;

  fileIO.write_count_to_file(counter);
  fileIO.write_to_file(userID, session, (dat) => {
    res.render('home', {
      'userID': userID,
      'bookID': dat[userID][dat[userID].length - 1]['book_count'],
      'books': dat[userID],
      'res': true,
      'enabled': true,
      'updated': false 
    });
  });
});
app.get('/edit/:userID', edit.view);
app.get('/help/:userID', help.view);
app.get('/reading/:userID/:bookID', (req, res) => {
  let data = require('./public/db/data.json');
  res.render('reading', {
    'userID': req.params.userID,
    'bookID': req.params.bookID,
    'books': data[req.params.userID]
  });
});
app.get('/select/:userID/:bookName', (req, res) => {

  let data = require('./public/db/data.json');

  let userID = req.params.userID;
  let bookName = req.params.bookName;
  let i = 0, saved = 0;

  let curr = data[userID];

  for(i = 0; i < curr.length; ++i) {
    if(curr[i]['name'] === bookName) {
      curr[i]['active'] = 1;
      saved = i;
    } 
  }

  fileIO.write_to_file(userID, curr[saved], (dat) => {
    res.render('home', {
      'userID': userID,
      'bookID': dat[userID][dat[userID].length - 1]['book_count'],
      'books': dat[userID],
      'res': false,
      'enabled': true,
      'updated': true
    });
  });
});
app.get('/privacy', privacy.view);
app.get('/terms',terms.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
