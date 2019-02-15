
var fs = require('fs');

exports.write_to_file = function (id, session, callback) {

  fs.readFile('db/data.json', 'utf8', (err, data) => {
    if(err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      if(obj.hasOwnProperty(id)) {
        let lst = obj[id];
        for(let ind = 0; ind < lst.length; ind++) {
          if(lst[ind] === session.name) {
            lst.splice(ind, 1);
          }
        }
        lst.push(session);
        obj[id] = lst;
        console.log(session);
        let toWrite = JSON.stringify(obj);
        fs.writeFileSync('db/data.json', toWrite);
      } else {
        console.log("No such user: " + id);
      }
    }
  });

  if(typeof callback === 'function') {
    callback();
  }
}