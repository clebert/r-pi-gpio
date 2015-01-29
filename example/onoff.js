'use strict';

var gpio     = require('../lib/gpio.js');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var defaultPin = 4;

rl.question('pin (default ' + defaultPin + '): ', function (response) {
    rl.close();

    var pin     = parseInt(response, 10);
    var trigger = gpio.output(isNaN(pin) ? defaultPin : pin);

    var level;

    setInterval(function () {
        trigger(level = !level);
    }, 500);
});
