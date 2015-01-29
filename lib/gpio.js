'use strict';

var assert = require('expressive-assertion');
var gpio   = require('../build/Release/gpio.node');
var ts     = require('typesystem');

var assertIsPin = function (pin) {
    assert(function () {
        return ts.isInteger(pin);
    }, function () {
        return pin >= 0;
    }, function () {
        return pin <= 53;
    });
};

exports.input = function (pin) {
    assertIsPin(pin);

    gpio.configureAsInput(pin);

    return function () {
        return !!gpio.getLevel(pin);
    };
};

exports.output = function (pin) {
    assertIsPin(pin);

    gpio.configureAsOutput(pin);

    return function (level) {
        gpio.setLevel(pin, !!level);
    };
};
