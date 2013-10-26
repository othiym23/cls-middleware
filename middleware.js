'use strict';

module.exports = function clsify(ns) {
  if (!ns) throw new Error('CLS namespace required');

  return function (req, res, next) {
    ns.bindEmitter(req);
    ns.bindEmitter(res);

    ns.run(function () {
      next();
    });
  };
};
