var through = require('through2');
var duplexer = require('duplexer2');

module.exports = function (stream) {
    var encoder = encode();
    var decoder = decode();
    encoder.pipe(stream).pipe(decoder);
    var s = duplexer(encoder, decoder);
    stream.on('close', function() {
        s.emit('close')
    })
    return s;
};

function encode () {
    return through(function (buf, enc, next) {
        this.push(buf.toString('base64'));
        next();
    });
}

function decode () {
    return through(function (buf, enc, next) {
        this.push(Buffer(buf.toString('utf8'), 'base64'));
        next();
    });
}
