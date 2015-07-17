var fs = require('fs'),
    csv = require('csv'),
    async = require('async'),
    read = {};

// read.parse = function(cb){
//   csv.parse({delimiter: ','}, function(err, data){
//     cb(err,data);
//   });
// }

read.csv = function(filePath,cb){
  fs.readFile(__dirname+filePath, function(err,file){
    if (err) throw err;
    csv.parse(file.toString(), {columns: true, relax: true, delimiter: '|'}, function(err,data){
      if (err) throw err;
      cb(err,data);
    });
  });
}

read.get = function(wanted,filePath,cb){
  read.csv(filePath,function(err,data){
    if (err) throw err;
    async.detect(data, function(item,cb){
      if (item['source'] === wanted){
        cb(true);
      }
      cb(false);
    },
    function(result){
      if (typeof(result) === "object"){
        cb(err,result['destination'],data);
      } else {
        cb(err,undefined,data);
      }
    });
  });
};

module.exports = read;
