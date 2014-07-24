'use strict';

var gpio = require('../lib/gpio');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var defaultPin = 18;

rl.question('pin (default ' + defaultPin + '): ', function (response) {
    rl.close();

    var level = false;
    var pin = parseInt(response, 10);
    var trigger = gpio.output(isNaN(pin) ? defaultPin : pin);

    setInterval(function () {
        trigger(level = !level);
    }, 500);
});
