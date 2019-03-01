/**
 * Javascript module for doing fileIO. Essentially, this file acts as the database
 * layer for a non-existent database. If this application is revisited, this file should
 * be refactored to hook up to a real database (probably mongoDB).
 */

var fs = require('fs');
const identity = (x) => x; // define default callback function

/**
 * This function writes the book count to the counts database only.
 * @param data data to be written back to disk
 */
exports.write_count_to_file = function(data) {
  fs.writeFileSync('./db/counts.json', JSON.stringify(data));
}

/**
 * This function writes the book data to the database.
 * @param id user id to write to
 * @param session book information given by the user
 * @param callback function to run upon success
 */
exports.write_to_file = function(id, session, callback = identity) {

  // Grab the data
  var obj = JSON.parse(fs.readFileSync('./db/data.json', 'utf8'));

  // Check if user is in the database already
  if(obj.hasOwnProperty(id)) {

    // If the book they want is there, remove it
    let lst = obj[id];
    let ind = 0;
    for(ind = 0; ind < lst.length; ind++) {
      if(lst[ind]['name'] === session.name) {
        lst.splice(ind, 1);
      }

      // set all other books to inactive
      if(lst[ind] !== undefined) {
        lst[ind]['active'] = 0;
      }
    }

    // add the current session to the list
    lst.push(session);
    obj[id] = lst;
  } else {
    obj[id] = [];
    obj[id].push(session);
  }

  // write file out synchronously
  fs.writeFileSync('./db/data.json', JSON.stringify(obj));

  // run the callback
  if(typeof callback === 'function') {
    callback(obj);
  }
}