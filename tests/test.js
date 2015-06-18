var assert = require("assert"),
    request = require("request"),
    app = require("../app");

// // Check that redirects are valid JSON
// assert.doesNotThrow(
//   function(){
//     var redirects = require('../redirects.json');
//   },
//   "redirects.json should be valid JSON."
// );

app(function(err,host,port){
  request.get('http://localhost:3000', function (err, res, body){
    // expect(res.statusCode).to.equal(400);
    // expect(res.body).to.equal('wrong header');
    console.log(res.statusCode);
  });
});