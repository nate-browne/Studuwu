
/*
 * GET home page.
 */
var fs = require('fs');
const identity = (x) => x;

exports.view = function(req, res){
	var bookdat;
	var enabled = true;
	var index = 0;
  	var data = fs.readFileSync('db/data.json', 'utf8');
  	bookdat = JSON.parse(data);
  	let id = req.params.userID;

	if(JSON.stringify(bookdat) == "{}") {
		bookdat = "nonexist";
		enabled = false;
	}else{
		index = bookdat[id][0].book_count;
	}
	
	res.render('home', {
		'userID': req.params.userID,
		'bookID': index,
		'books': bookdat[id],
		'res': false,
		'enabled': enabled,
		'updated': false 
	});
}