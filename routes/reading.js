
/*
 * GET add page
 */

var data = require('../public/db/data.json');

exports.view = function(req, res){
  	res.render('reading', {
    'userID': req.params.userID,
    'bookID': req.params.bookID,
    'books': data[req.params.userID]
  });
}