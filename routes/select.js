
var fileIO = require("../public/js/fileIO");
//var data = require('../db/data.json');

var fs = require('fs');
const identity = (x) => x;

/*
  var bookdat;
  var enabled = true;
  var index = 0;
    var data = fs.readFileSync('db/data.json', 'utf8');
    bookdat = JSON.parse(data);
    */

exports.update = function(req, res) {
  let userID = req.params.userID;
  let bookName = req.params.bookName;
  let i = 0, saved = 0;
  var bookdat;
  var data = fs.readFileSync('db/data.json', 'utf8');
  bookdat = JSON.parse(data);

  let curr = bookdat[userID];

  for(i = 0; i < curr.length; ++i) {
    if(curr[i]['name'] === bookName) {
      curr[i]['active'] = 1;
      saved = i;
    } 
  }

  fileIO.write_to_file(userID, curr[saved], (dat) => {
    res.render('home', {
      'userID': userID,
      'bookID': dat[userID][dat[userID].length - 1]['book_count'],
      'books': dat[userID],
      'res': false,
      'enabled': true,
      'updated': true
    });
  })

}