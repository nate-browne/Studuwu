
/*
 * GET home page.
 */
var data = require('../db/data.json');

exports.view = function(req, res){
	var bookdat;
	let temp = data[req.params.userID];
	if(temp === undefined) {
		bookdat = "nonexist";
	}else{
		bookdat = data[req.params.userID][0]['book_count'];
	}
	res.render('home', {
		'userID': req.params.userID,
		'bookID': bookdat,
		'books': data[req.params.userID],
		'res': false
	});
};