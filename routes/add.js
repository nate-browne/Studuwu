
/*.
 * GET add page
 */

const alert = require('alert-node');

var fileIO = require("../public/js/fileIO");
var counter = require('../db/counts.json');

exports.view = function(req, res){
  let id = req.params.userID;
  console.log(id);
  res.render('add', {
    'userID': id
  });
}

exports.submitForm = function(req, res) {

  let locCount = ++counter["count"];
  let userID = req.params.userID;
  let session = {};
  let name = req.query.book;
  let page_num = req.query.pages;
  let time_per_page = req.query.time;
  let rest_time = req.query.break;
  let reminder = req.query.reminder;

  session["name"] = name;
  session["page_num"]= page_num;
  session["time_per_page"] = time_per_page;
  session["rest_time"] = rest_time;
  session["reminder"] = reminder;
  session["book_count"] = locCount;

  counter["count"] = locCount;

  fileIO.write_count_to_file(counter);
  fileIO.write_to_file(userID, session, (dat) => {
    res.render('home', {
      'userID': userID,
      'books': dat[userID],
      'res': true
    });
  });
}