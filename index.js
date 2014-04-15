'use strict';

var fs = require('fs');

var rootPath = '/sys/class/gpio/';

function GPIO(id, direction) {
    var path = rootPath + 'gpio' + id + '/';

    if (!fs.existsSync(path)) {
        fs.writeFileSync(rootPath + 'export', id);
    }

    fs.writeFileSync(path + 'direction', direction);

    this.fd = fs.openSync(path + 'value', 'r+');
    this.id = id;
}

exports.GPIO = GPIO;

GPIO.input = function (id) {
    return new GPIO(id, 'in');
};

GPIO.output = function (id) {
    return new GPIO(id, 'out');
};

GPIO.prototype.destroy = function () {
    fs.closeSync(this.fd);
    fs.writeFileSync(rootPath + 'unexport', this.id);
};

var zero = new Buffer('0');
var one = new Buffer('1');

GPIO.prototype.write = function (value) {
    fs.writeSync(this.fd, value ? one : zero, 0, 1, 0);

    return this;
};

var buffer = new Buffer(1);

GPIO.prototype.read = function () {
    fs.readSync(this.fd, buffer, 0, 1, 0);

    return buffer[0] === one[0];
};
