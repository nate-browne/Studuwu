
/*
 * GET home page.
 */
var data = require('../public/db/data.json');

exports.view = function(req, res){
	var bookdat;
	var enabled = true;
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
};