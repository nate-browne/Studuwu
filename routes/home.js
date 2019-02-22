
/*
 * GET home page.
 */
var data = require('../db/data.json');

exports.view = function(req, res){
	var bookdat = data[req.params.userID][0]['book_count'];
	if(bookdat === undefined) {
		bookdat = "";
	}
	res.render('home', {
		'userID': req.params.userID,
		'bookID': bookdat,
		'books': data[req.params.userID],
		'res': false
	});
};