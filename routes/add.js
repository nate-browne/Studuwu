
/*.
 * GET add page
 */

var fileIO = require("../public/js/fileIO");
var data = require('../db/data.json');

exports.view = function(req, res){
  let id = req.params.userID;
  console.log(id);
  res.render('add', {
    'userID': id
  });
}

exports.submit = function(req, res) {

  let userID = req.params.userID;
  let session = {};
  let name = req.query.name;
  let page_num = req.query.pages;
  let time_per_page = req.query.time;
  let rest_time = req.query.break;
  let reminder = req.query.reminder;

  session["name"] = name;
  session["page_num"]= page_num;
  session["time_per_page"] = time_per_page;
  session["rest_time"] = rest_time;
  session["reminder"] = reminder;

  fileIO.write_to_file(userID, session, () => {
    res.render('home', {
      'userID': userID,
      'books': data[userID]
    });
  });
}