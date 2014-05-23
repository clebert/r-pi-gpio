'use strict';

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('pin (default 10): ', function (pin) {
    pin = parseInt(pin, 10);

    if (isNaN(pin)) {
        pin = 10;
    }

    rl.close();

    var Gpio = require('../index.js');
    var gpio = new Gpio(pin);

    gpio.setOutput();

    var level = false;

    setInterval(function () {
        gpio.setLevel(level = !level);
    }, 500);
});
