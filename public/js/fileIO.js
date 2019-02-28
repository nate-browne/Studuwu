
var fs = require('fs');
const identity = (x) => x;

exports.write_count_to_file = function(data) {
  fs.writeFileSync(`${__dirname}/../db/counts.json`, JSON.stringify(data));
}

exports.write_to_file = function(id, session, callback = identity) {
  var obj;
  var data = fs.readFileSync(`${__dirname}/../db/data.json`, 'utf8');
  obj = JSON.parse(data);
  if(obj.hasOwnProperty(id)) {
    let lst = obj[id];
    let ind = 0;
    for(ind = 0; ind < lst.length; ind++) {
      if(lst[ind]['name'] === session.name) {
        lst.splice(ind, 1);
      }
      if(lst[ind] !== undefined) {
        lst[ind]['active'] = 0;
      }
    }
    lst.push(session);
    obj[id] = lst;
    console.log(session);
  } else {
    obj[id] = [];
    obj[id].push(session);
  }
  fs.writeFileSync(`${__dirname}/../db/data.json`, JSON.stringify(obj));

  if(typeof callback === 'function') {
    callback(obj);
  }
}