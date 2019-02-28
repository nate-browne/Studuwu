
/*
 * GET add page
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
  	res.render('reading', {
    'userID': req.params.userID,
    'bookID': req.params.bookID,
    'books': data[req.params.userID]
  });
}