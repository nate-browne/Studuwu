
/*
 * GET add page
 */

exports.view = function(req, res){
  res.render('edit', {
    'userID': req.params.userID
  });
  
};
