## Connect / Restify middleware for CLS

Dirt-simple middleware for Connect and Restify handlers into a
continuation-local storage context.

Example:

```js
var cls     = require('continuation-local-storage');
var express = require('express');
var clsify  = require('cls-middleware');

var ns = cls.createNamespace('namespace');

var app = express();
app.use(clsify(ns));

app.get('/users', function (req, res, next) {
  // ns.get('whatever') will work here now.
});
```
