'use strict';

var gpio = require('../build/Release/gpio.node');
var ts   = require('typesystem');

var isPin = function (value) {
    return ts.isInteger(value) && value >= 0 && value <= 53;
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
