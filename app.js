var express = require('express'),
    _ = require('underscore'),
    cons = require('consolidate'),
    read = require('./read');
    app = express()
    ;
    app.locals._ = _;

var startApp = function(cb) {
  // Set up our views
  app.engine('html', cons.ejs);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');

  app.get('/', function(req,res){
    read.csv('/redirects.csv', function(err,data){
      res.render('index', {
        error: false,
        redirects: data
      });
    });
  });

  app.get('/:wanted', function(req,res){
    read.get(req.params.wanted, '/redirects.csv', function(err,url,data){
      if (err) throw err;
      if (typeof(url) === "string"){
        // Send them to the right place
        res.redirect(301, url);
      } else {
        // I don't know that link
        var request_url = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.render('index', {
          error: true,
          redirects: data,
          request_url: request_url
        });
      }
    });
  });

  app.get('/.well-known/status', function(req,res){
    res.json({
      status: "ok",
      updated: Math.floor(new Date() / 1000),
      dependencies: [],
      resources: {}
    });
  });

  var server = app.listen(process.env.PORT || 3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at port %s', port);
    cb(null,host,port,this);
  });
}

module.exports = startApp;
