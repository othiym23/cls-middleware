'use strict';

var test = require('tap').test;

test("basic express scenario", function (t) {
  t.plan(6);

  var http    = require('http');
  var express = require('express');
  var cls     = require('continuation-local-storage');
  var clsify  = require('../middleware.js');
  var request = require('request');

  var ns = cls.createNamespace('cls@test');
  ns.run(function () {
    ns.set('value', 1);

    var app = express();
    t.doesNotThrow(function () { app.use(clsify(ns)); });
    app.use(function (req, res, next) {
      var orig = ns.get('value');
      t.equal(orig, 1, "value is default");

      ns.set('value', orig + 1);
      next();
    });

    app.get('/THUNDAR', function (req, res) {
      t.equal(ns.get('value'), 2, "value was incremented");
      res.send({status : 'ok'});
      res.end();
    });

    var server = http.createServer(app).listen(8080, function () {
      request('http://localhost:8080/THUNDAR',
              {json : true},
              function (error, res, body) {
        t.notOk(error, "no error found");
        t.equal(res.statusCode, 200, "got OK response");
        t.deepEqual(body, {status : 'ok'}, "body was as expected");
        server.close();
      });
    });
  });
});
