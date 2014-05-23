'use strict';

var gpio = require('./build/Release/gpio.node');
var typeutil = require('typeutil');

var Gpio = typeutil.typify(function (pin) {
    if (!(this instanceof Gpio)) {
        throw new Error('Missing new keyword.');
    }

    if (!typeutil.isInteger(pin) || pin < 0 || pin > 53) {
        throw new Error('Invalid pin.');
    }

    this.getLevel = function () {
        return gpio.getLevel(pin);
    };

    this.setLevel = function (level) {
        gpio.setLevel(pin, !!level);

        return this;
    };

    this.setInput = function () {
        gpio.setInput(pin);

        return this;
    };

    this.setOutput = function () {
        gpio.setOutput(pin);

        return this;
    };
}, '(number) => void');

module.exports = Gpio;
