'use strict';

var assert = require('expressive-assertion');
var exec   = require('child_process').exec;
var gpio   = require('../build/Release/gpio.node');
var ts     = require('typesystem');

var initCalled  = false;
var initialized = false;

var init = function (callback) {
    if (initCalled) {
        throw new Error('`gpio.init()` already called');
    }

    initCalled = true;

    var command = 'cat /proc/cpuinfo | grep Hardware | rev | cut -d ":" -f 1 | rev | tr -d " "';

    exec(command, function (error, hardware) {
        if (error) {
            return callback(error);
        }

        if (hardware === 'BCM2708') {
            gpio.init(1);
        } else if (hardware === 'BCM2709') {
            gpio.init(2);
        } else {
            gpio.init(0);
        }

        initialized = true;

        callback(null);
    });
};

var assertIsPin = function (value) {
    assert(function () {
        return ts.isInteger(value) && value >= 0 && value <= 53;
    });
};

var createInput = function (pin, testMode) {
    if (!initialized && !testMode) {
        throw new Error('please call `gpio.init()` first');
    }

    assertIsPin(pin);

    gpio.configureAsInput(pin);

    return function () {
        return !!gpio.getLevel(pin);
    };
};

var createOutput = function (pin, testMode) {
    if (!initialized && !testMode) {
        throw new Error('please call `gpio.init()` first');
    }

    assertIsPin(pin);

    gpio.configureAsOutput(pin);

    return function (level) {
        gpio.setLevel(pin, !!level);
    };
};

exports.init         = init;
exports.createInput  = createInput;
exports.createOutput = createOutput;
