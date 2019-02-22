
var fileIO = require("../public/js/fileIO");
var data = require('../db/data.json');

exports.update = function(req, res) {
  let userID = req.params.userID;
  let bookName = req.params.bookName;
  let i = 0, saved = 0;

  let curr = data[userID];

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