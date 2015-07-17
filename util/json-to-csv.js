/*
 * Transform JSON to CSV
 *
 * Allows us to take a JSON file, and transform its keys and values into
 * a well-structured CSV. In this example, we take the keys and turn
 * them into the "source" field in the CSV, and turn the values into the
 * "destination" field.
 *
 * Assumes there is a file in the root directory called redirects.json
 * with entries and a file in the root called redirects.csv that is empty
 * and will be overwritten.
 *
 * Because we're letting humans edit this, we'll use a pipe | instead of a
 * comma as a delimiter in each field.
 */

 var path = require('path'),
     fs = require('fs'),
     _ = require('underscore'),
     dir = path.dirname(require.main.filename) + '/../', // path to the root
     redirectCount = 0; // so we can count how many redirects we write and output

// Try to load redirects
try {
  var redirectsJSON = require('../redirects.json')
} catch(err) {
  if (err) {
    // Throw an error if we can't find one
    err.message = err.message + '\n\n!!!!\n!!!! You must have a redirects.json file in the root folder\n!!!!\n';
    throw err;
  }
}

// Create our writestream to output.csv
var wstream = fs.createWriteStream(dir + 'redirects.csv');

// First, write our headers, which will be 'source,destination'
wstream.write('source|destination\n');

// Write each redirect
_.each(redirectsJSON, function(val,key){
    wstream.write(key+'|'+val+'\n');
    redirectCount++;
})

// End the stream
wstream.end();

// Goodbye
console.log('Wrote '+redirectCount+' redirects to '+dir+'redirects.csv');
