'use strict';

var Gpio = require('../index.js');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('pin (default 18): ', function (pin) {
    pin = parseInt(pin, 10);

    if (isNaN(pin)) {
        pin = 18;
    }

    rl.close();

    var gpio = new Gpio(pin);

    gpio.setOutput();

    var level = false;

    setInterval(function () {
        gpio.setLevel(level = !level);
    }, 500);
});
