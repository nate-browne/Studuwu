
/*.
 * GET add page
 */

var fileIO = require("../public/js/fileIO");
var counter = require('/app/public/db/counts.json');

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
  let name = req.body.book;
  let page_num = req.body.pages;
  let time_per_page = req.body.time;
  let rest_time = req.body.break;
  //let num_rest = req.body.numBreaks;
  let reminder = req.body.reminder;

  session["ownerID"] = userID;
  session["name"] = name;
  session["page_num"]= page_num;
  session["time_per_page"] = time_per_page;
  session["rest_time"] = rest_time;
  //session["num_breaks"] = num_rest;
  session["reminder"] = reminder;
  session["book_count"] = locCount;
  session["active"] = 1;

  counter["count"] = locCount;

  fileIO.write_count_to_file(counter);
  fileIO.write_to_file(userID, session, (dat) => {
    res.render('home', {
      'userID': userID,
      'bookID': dat[userID][dat[userID].length - 1]['book_count'],
      'books': dat[userID],
      'res': true,
      'enabled': true,
      'updated': false 
    });
  });
}