var shoe = require('../');
var http = require('http');

var ecstatic = require('ecstatic')(__dirname + '/static');
var server = http.createServer(ecstatic);
server.listen(5000);

var sock = shoe(function (stream) {
    stream.write(new Buffer(5000));
});
sock.install(server, '/sock');
