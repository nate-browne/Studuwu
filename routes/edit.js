/**
 * Javascript module for dealing with the edit page
 */

/**
 * Render method for the edit page.
 */
exports.render = function(req, res){
  res.render('edit', {
    'userID': req.params.userID
  });
};