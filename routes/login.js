/**
 * Javascript file for dealing with the login page
 */

/**
 * Render method for the login page (aka studuwu.herokuapp.com)
 * @param req request data going in. unused
 * @param res response data going back out
 */
exports.render = function(req, res){
  res.render('login');
};