var express = require('express'),
    _ = require('underscore'),
    cons = require('consolidate'),
    redirects = require('./redirects.json'),
    app = express()
    ;

// Set up our views
app.engine('html', cons.ejs);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req,res){
  res.render('index', {
    error: false
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
    // Send them to the right place
    res.redirect(301, redirects[req.params.wanted]);
  }
});

var server = app.listen(process.env.PORT || 3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at port %s', port);
});
