var shoe = require('shoe');
var wrap = require('./lib/wrap.js');

module.exports = function (cb) {
    return shoe(function (stream) {
        cb(wrap(stream));
    });
};
