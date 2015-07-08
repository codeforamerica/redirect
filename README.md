[![Build Status](https://travis-ci.org/codeforamerica/redirect.svg?branch=master)](https://travis-ci.org/codeforamerica/redirect)

Redirect
=========

A simple app that redirects people to whereever we want. This is the service behind [http://c4a.me]([http://c4a.me]). Redirects are stored in the `redirects.csv` file. You can add or remove redirects there.

# Adding links

To add a link, edit the [`redirects.csv`](https://github.com/codeforamerica/redirect/blob/master/redirects.csv) file. If you create a [free Github account](https://help.github.com/articles/signing-up-for-a-new-github-account/), you can edit it online by following these steps:

#### 1. Open the `redirects.csv` file

[Click this link to open the `redirects.csv` file in the Github online editor.](https://github.com/codeforamerica/redirect/blob/master/redirects.csv)

#### 2. Click the edit button

![Click the edit button](https://cloud.githubusercontent.com/assets/6456757/8560911/2cf397f6-24d2-11e5-97fa-81bbb680fb4e.png)

#### 3. Add a new line with a new redirect

Create a new line in the file underneath the header, `source,destination`.

Your redirect should follow this format:
```
redirecturl,http://example.com/where/to/go
```

The section before the comma will be added on to the end of c4a.me to create your url. The second after the comma is the link users will be redirected to.

In our example below, the new entry called `redirecturl` would become the public link `http://c4a.me/redirecturl` pointing to `http://example.com/where/to/go`.

![Add a new redirect](https://cloud.githubusercontent.com/assets/6456757/8560960/cc7670be-24d2-11e5-8884-3d3f78ae0ab5.png)

#### 4. Explain your changes and create a pull request

Give a short description in the box at the bottom of the online editor and click the **Propose File Change** button.

![Explain your changes](https://cloud.githubusercontent.com/assets/6456757/8560912/2cf3e5bc-24d2-11e5-9c05-c27dbeb9e9ed.png)

On the next screen, click the **Create Pull Request** button to finish making your change.

![Finish PR](https://cloud.githubusercontent.com/assets/6456757/8560910/2cf388b0-24d2-11e5-9733-37c22518222d.png)


#### 5. Your change will be ready soon

We'll review your change and merge it. If the change is urgent, contact David Leonard. On Code for America's Slack, message **davidleonard**. Send an email to [dleonard@codeforamerica.org](dleonard@codeforamerica.org).

# What is uses
This is a simple [node.js](https://github.com/codeforamerica/howto/blob/master/Node.js.md) app. We run it on [Heroku](https://heroku.com).

# How to install and run locally

First, you'll need to install [node.js](https://github.com/codeforamerica/howto/blob/master/Node.js.md). Then, clone the project down locally and open it in your terminal:

```
$ git clone https://github.com/codeforamerica/redirect.git
$ cd redirect
```

We use the npm package manager to keep our dependencies up to date. Run this command to fetch and install all dependencies:
```
$ npm install
```

Now, start the server:
```
$ npm start
```

You can then access your server at [http://localhost:3000/](http://localhost:3000/).

# How to run it in the cloud
We use [Heroku](https://heroku.com) to host redirect. Heroku will automatically read the `package.json` file and run the task specified under `npm start` to start up the app.

You can learn more about [deploying a node.js app on Heroku on their website](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).
