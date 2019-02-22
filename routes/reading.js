
/*
 * GET add page
 */

exports.view = function(req, res){
  res.render('reading', {
    'userID': req.params.userID,
    'bookID': req.params.bookID
  });
}