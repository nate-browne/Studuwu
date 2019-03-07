/**
 * Javascript module for dealing with the home screen
 */

var fs = require('fs');

exports.render = function(req, res) {

  // Grab the file data
  let data = JSON.parse(fs.readFileSync('./db/data.json', 'utf8'));
  console.log(data);

  // Check for new user
  // TODO: see if we still need this
	let bookdat;
	let enabled = true;
	let temp = data[req.params.userID];
	if(temp === undefined) {
		bookdat = "nonexist";
		enabled = false;
	}else{
		bookdat = data[req.params.userID][0]['book_count'];
	}

  // Send information to the home screen
	res.render('homeB', {
		'userID': req.params.userID,
		'bookID': bookdat,
		'books': data[req.params.userID],
		'res': false,
		'enabled': enabled,
		'updated': false,
	});
}