'use strict';

var gpio = require('../build/Release/gpio.node');
var ts   = require('typesystem');

var isPin = function (value) {
    return ts.isUInt(value) && value <= 53;
};

exports.input = function (pin) {
    ts.check(pin, isPin);

    gpio.setAsInput(pin);

    return function () {
        return !!gpio.getLevel(pin);
    };
};

exports.output = function (pin) {
    ts.check(pin, isPin);

    gpio.setAsOutput(pin);

    return function (level) {
        gpio.setLevel(pin, !!level);
    };
};
