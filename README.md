Redirect
=========

This is a simple Node app that allows us to serve shortlinks that redirect places and retain ownership of our data. We run it on Heroku and serve links at [http://c4a.me/](http://c4a.me/). This software is in beta: it works pretty well, serves our needs, but could use some improvement. See our [repo issues](https://github.com/codeforamerica/redirect/issues/) if you'd like to help improve it.

**Note: The master branch of this repo automatically deploys to Heroku if it passes tests.**

# What it does

Redirect reads links in redirects.json and redirects visitors to the right place. 

# Adding links

Branch or fork, add a new key/value pair in `redirects.json` and submit a Pull Request.

# What it uses

* [Node](https://github.com/codeforamerica/howto/blob/master/Node.js.md)
* Redis (for analytics)

# How to install and run locally

```
$ git clone https://github.com/codeforamerica/redirect.git
$ cd redirect
$ npm install
$ npm start
```

# How to run tests

```
$ npm test
```

Tests currently check to make sure the `redirects.json` file is valid JSON, and that the application serves redirects for each line in the file correctly.

# License

This software is Copyright (c) 2015 Code for America, and released under the MIT License. Please see `LICENSE` for details.

