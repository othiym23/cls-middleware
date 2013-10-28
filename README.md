## Connect / Restify middleware for CLS

Dirt-simple middleware for Connect and Restify handlers into a
continuation-local storage context.

Example `app.js`:

```js
var cls     = require('continuation-local-storage');
var express = require('express');
var clsify  = require('cls-middleware');
var route   = require('./route.js');

var ns = cls.createNamespace('namespace');

var app = express();
app.use(clsify(ns));

ns.set('whatever', 'a value');

app.get('/users', route);
```

with `./route.js`:

```js
var cls = require('continuation-local-storage');

module.exports = function (req, res, next) {
  // pulling from the namespace, and set up per request
  res.send({value : cls.getNameSpace('namespace').get('whatever')});

  next();
};
```
