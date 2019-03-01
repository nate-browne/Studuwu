/**
 * Javascript file for dealing with the help page
 */

/**
 * render method for the help screen
 * @param req request data going in. unused
 * @param res response data going back out
 */
exports.render = function(req, res){
  res.render('help', {
    'userID': req.params.userID
  });
};