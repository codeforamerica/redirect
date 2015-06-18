var assert = require("assert"),
    request = require('supertest'),
    async = require("async"),
    app = require("../app");

// Check that redirects are valid JSON
assert.doesNotThrow(
  function(){
    var redirects = require('../redirects.json');
  },
  "redirects.json should be valid JSON."
);

// Run the server, make sure it actually works, and test all redirects
app(function(err,host,port,server){
  var redirects = require('../redirects.json');
  async.parallel([
    function(cb){

      request(server)
        .get('/')
        .expect(200)
        .end(function(err,res){
          assert.doesNotThrow(
            function(){ if (err) throw err; },
            "The root address should return 200 when accessed over http"
          );
          cb();
        });

    },
    function(cb){

      request(server)
        .get('/.well-known/status')
        .expect(200)
        .end(function(err,res){
          assert.doesNotThrow(
            function(){ if (err) throw err; },
            "The /.well-know/status"
          );
          cb();
        });

    },
    function(cb){

      async.forEachOfSeries(redirects, function(val,key,cb){
        request(server)
          .get('/'+key)
          .expect(301)
          .end(function(err,res){
            assert.doesNotThrow(
              function(){ if (err) throw err; },
              "Each redirect pair should return a 301"
            );
            cb();
          });
      },function(err,res){ cb(); });

    }
  ],function(err,res){ server.close(); });
});
