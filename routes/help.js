
/*
 * GET add page
 */

exports.view = function(req, res){
  res.render('help', {
    'userID': req.params.userID
  });
};