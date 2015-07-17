var assert = require('chai').assert,
    fs = require('fs'),
    path = require('path'),
    request = require('supertest'),
    async = require("async"),
    csv = require('csv'),
    read = require('../read'),
    app = require("../app"),
    redirectsFile = path.dirname(require.main.filename) + '/../redirects.csv';

// Check that there is a redirect file
assert.doesNotThrow(
  function(){
    fs.readFile(redirectsFile, function(err,file){
      if (err) throw err;
      console.log('✓ redirects.csv exists in the root of this project');
    });
  },
  Error,
  'redirects.csv exists in the root of this project'
);

// Check that we can read and parse the redirect file
assert.doesNotThrow(
  function(){
    fs.readFile(redirectsFile, function(err,file){
      if (err) throw err;
      csv.parse(file.toString(), {columns: true, relax: true, delimiter: '|'}, function(err,data){
        if (err) throw err;
        console.log('✓ redirects.csv is a valid csv we can parse');
      });
    });
  },
  Error,
  'redirects.csv is a valid csv we can parse'
);

// Run the server, make sure it actually works, and test all redirects
// NOTE: we call '/redirects.csv' because relative that call is relative to
// the location of the read library.
app(function(err,host,port,server){
  read.csv('/redirects.csv', function(err,redirects){
    assert.isNull(err, 'the read module loads redirects from redirects.csv');

    async.parallel([
      function(cb){

        request(server)
          .get('/')
          .expect(200)
          .end(function(err,res){
            assert.doesNotThrow(
              function(){ if (err) throw err; },
              Error,
              'the root address returns 200 OK when accessed over http'
            );
            cb(err);
          });

      },
      function(cb){

        request(server)
          .get('/.well-known/status')
          .expect(200)
          .end(function(err,res){
            assert.doesNotThrow(
              function(){ if (err) throw err; },
              Error,
              'the /.well-know/status endpoint returns 200 OK'
            );
            console.log('')
            cb(err);
          });

      },
      function(cb){

        async.forEachOfSeries(redirects, function(val,key,cb){
          request(server)
            .get('/'+val['source'])
            .expect(301)
            .end(function(err,res){
              assert.doesNotThrow(
                function(){ if (err) throw err; },
                Error,
                'each redirect pair returns 301'
              );
              console.log('✓ we get a 301 redirect code for /' + val['source']);
              cb(err);
            });
        },function(err,res){ cb(err); });

      }
    ],function(err,res){
      assert.isNull(err, 'we can access the server and the redirects work');
      console.log('✓ we can access the server and the redirects work')
      server.close();
    });

  });
});
