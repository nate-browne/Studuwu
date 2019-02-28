
/*.
 * GET add page
 */

exports.view = function(req, res){
  let id = req.params.userID;
  console.log(id);
  res.render('add', {
    'userID': id
  });
}