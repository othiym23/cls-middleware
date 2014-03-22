## Connect / Restify middleware for CLS

Dirt-simple middleware for Connect and Restify handlers that sets up
a continuation-local storage context per request.

Example `app.js`:

```js
var cls     = require('continuation-local-storage');
var express = require('express');
var clsify  = require('cls-middleware');
var route   = require('./route.js');

// you can use any namespace name as long as you use the same for set/get
var ns = cls.createNamespace('requestScope');
var requestCounter = 0;

var app = express();
// let the middleware set up the continuation-local storage context
app.use(clsify(ns));
app.use(function (req, res, next) {
  // put something in the namespace, a requestId in this case
  ns.set('reqId', ++requestCounter);
  next();
});

app.get('/users', route);
```

and `./route.js`:

```js
var cls = require('continuation-local-storage');

module.exports = function (req, res, next) {
  // pulling from the namespace which is set up per request
  res.send({value : cls.getNamespace('requestScope').get('reqId')});
};
```
