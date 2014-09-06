var shoe = require('shoe');
var wrap = require('./lib/wrap.js');

module.exports = function () {
    return wrap(shoe.apply(null, arguments));
};
