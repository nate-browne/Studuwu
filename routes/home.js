
/*
 * GET home page.
 */
var data = require('../db/data.json');

exports.view = function(req, res){
	console.log(req.params.userID);
	res.render('home', {
		'userID': req.params.userID,
		'books': data[req.params.userID]
	});
};