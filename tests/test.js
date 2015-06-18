var assert = require('assert');

// Check that redirects are valid JSON
assert.doesNotThrow(
  function(){
    var redirects = require('../redirects.json');
  },
  "redirects.json should be valid JSON."
);