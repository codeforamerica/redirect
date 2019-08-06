var express = require('express'),
    _ = require('underscore'),
    cons = require('consolidate'),
    analytics = require('./analytics'),
    redirects = require('./redirects.json'),
    app = express()
    ;
    app.locals._ = _;

var startApp = function(cb) {
  // Set up our views
  app.engine('html', cons.ejs);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');

  app.get('/', function(req,res){
    res.render('index', {
      error: false,
      redirects: redirects
    });
  });

  app.get('/:wanted', function(req,res){
    if (typeof(redirects[req.params.wanted]) === 'undefined') {
      // I don't know that link
      var request_url = req.protocol + '://' + req.get('host') + req.originalUrl;
      res.render('index', {
        error: true,
        request_url: request_url
      });
    } else {
      analytics.trackRedirect(req);
      // Send them to the right place
      res.redirect(302, encodeURI(redirects[req.params.wanted]));
    }
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
