
/*.
 * GET add page
 */

exports.view = function(req, res){
  let id = req.params.userID;
  res.render('add', {
    'userID': id
  });
}