'use strict';

var assert = require('expressive-assertion');
var gpio   = require('../build/Release/gpio.node');
var ts     = require('typesystem');

var assertIsPin = function (value) {
    assert(function () {
        return ts.isInteger(value) && value >= 0 && value <= 53;
    });
};

var createInput = function (pin) {
    assertIsPin(pin);

    gpio.configureAsInput(pin);

    return function () {
        return !!gpio.getLevel(pin);
    };
};

var createOutput = function (pin) {
    assertIsPin(pin);

    gpio.configureAsOutput(pin);

    return function (level) {
        gpio.setLevel(pin, !!level);
    };
};

exports.createInput  = createInput;
exports.createOutput = createOutput;
