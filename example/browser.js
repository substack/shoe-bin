var shoe = require('../');
var through = require('through2');

var stream = shoe('/sock');
stream.pipe(through(function (buf, enc, next) {
    console.log(buf.length + '\n');
    next();
})).pipe(stream);
