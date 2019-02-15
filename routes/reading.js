
/*
 * GET add page
 */

exports.view = function(req, res){
  console.log(req.params.userID);
  res.render('reading', {
    'userID': req.params.userID
  });
}