
var fs = require('fs');

exports.write_to_file = function (id, session, callback) {
  var obj;
  var data = fs.readFileSync('db/data.json', 'utf8');
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
  } else {
    obj[id] = [];
    obj[id].push(session);
  }
  fs.writeFileSync('db/data.json', JSON.stringify(obj));

  if(typeof callback === 'function') {
    callback(obj);
  }
}