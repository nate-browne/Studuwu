/**
 * Javascript module for dealing with the add page/submitting a form
 */

var fs = require('fs');
var fileIO = require('../fileIO');

/**
 * Render method. Send info to the add page
 * @param req request info coming in
 * @param res response data going back out
 */
exports.render = function(req, res){
  let id = req.params.userID;
  res.render('add', {
    'userID': id
  });
}

/**
 * Send method. Handles communication with the database layer
 * @param req request info coming in
 * @param res response data going back out
 */
exports.send = function(req, res) {

  // Read in the count file and update it
  let counter = JSON.parse(fs.readFileSync('./db/counts.json', 'utf8'));
  let locCount = ++counter["count"];

  // Construct the session data from the form
  let userID = req.params.userID;
  let session = {};
  let name = req.body.book;
  let page_num = req.body.pages;
  let time_per_page = req.body.time;
  let rest_time = req.body.break;
  let reminder = req.body.reminder;
  let bps = req.body.bps;

  session["ownerID"] = userID;
  session["name"] = name;
  session["page_num"]= page_num;
  session["time_per_page"] = time_per_page;
  session["rest_time"] = rest_time;
  session["reminder"] = reminder;
  session["book_count"] = locCount;
  session["active"] = 1;
  session["bps"] = bps;

  counter["count"] = locCount;

  // Write new information to the file
  fileIO.write_count_to_file(counter);
  fileIO.write_to_file(userID, session, (dat) => {
    res.redirect("/home/" + userID);
  });
}