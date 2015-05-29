Redirect
=========

We may be losing access to our Bit.ly account soon. This simple app is the beginnings of a way to seamlessly continue serving our shortlinks if that happens.

**NOTE: Pushing to master currently auto-deploys to Heroku while we build testing. So be careful.**

# What it does

Redirect reads links in redirects.json and redirects visitors to the right place. 

# Adding links

Branch or fork, add a new key/value pair in `redirects.json` and submit a Pull Request.

# What is uses

* [Node](https://github.com/codeforamerica/howto/blob/master/Node.js.md)

# How to install and run locally

```
$ git clone https://github.com/codeforamerica/redirect.git
$ cd redirect
$ npm install
$ npm start
```

# Features going forward

If we need to send this into production, we'll need: 

* Robust testing, to make sure this is always working
* Error logging and reporting, so we can know if it's up or down and when it fails
* Analytics reporting -- we should ping Google Analytics or some other service when requests are made to track usage and referrers