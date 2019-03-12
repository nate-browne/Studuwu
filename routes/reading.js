/**
 * Javascript module for the reading page
 */

var fs = require('fs');

/**
 * Render method for the reading page.
 * @param req request information coming in
 * @param res response info going back out
 */
exports.render = function(req, res) {

  // Grab the book data for the user
  let data = JSON.parse(fs.readFileSync('./db/data.json', 'utf8'));

  // Render the page with their data
  res.render('reading', {
    'userID': req.params.userID,
    'bookID': req.params.bookID,
    'books': data[req.params.userID]
  });
}