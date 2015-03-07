var through = require('through2');
var duplexer = require('duplexer2');

module.exports = function (stream) {
    var encoder = encode();
    var decoder = decode();
    encoder.pipe(stream).pipe(decoder);
        
    var result = duplexer(encoder, decoder);

    // propagate events up from shoe to shoe-bin
    stream.on('close', function () {
        result.emit('close');
    });
    stream.on('error', function (error) {
        result.emit('error', error);
    });

    return result;
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
