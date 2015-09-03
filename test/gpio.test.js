/* global beforeEach, describe, it */

'use strict';

var assert     = require('expressive-assertion');
var mock       = require('node-mock');
var nativeGpio = mock.require('../build/Release/gpio.node', __dirname, {});
var gpio       = require('../lib/gpio.js');
var ts         = require('typesystem');

var testAssertionErrors = function (method) {
    it('throws an assertion error', function () {
        assert.throws(function () {
            method(null, true);
        }, function (exception) {
            return exception.name === 'AssertionError';
        }, function (exception) {
            return /ts\.isInteger\(value\) && value >= 0 && value <= 53/.test(exception);
        });
    });
};

describe('gpio', function () {
    beforeEach(function () {
        nativeGpio.configureAsInput  = function () {};
        nativeGpio.configureAsOutput = function () {};
        nativeGpio.getLevel          = function () {};
        nativeGpio.setLevel          = function () {};
    });

    describe('.createInput()', function () {
        it('calls nativeGpio.configureAsInput() once with the given pin', function () {
            var called = 0;

            nativeGpio.configureAsInput = function (pin) {
                assert(function () {
                    return pin === 53;
                });

                called += 1;
            };

            gpio.createInput(53, true);

            assert(function () {
                return called === 1;
            });
        });

        it('returns an input function', function () {
            assert(function () {
                return ts.isFunction(gpio.createInput(0, true));
            }, function () {
                return ts.isFunction(gpio.createInput(53, true));
            });
        });

        testAssertionErrors(gpio.createInput);
    });

    describe('input()', function () {
        var input;

        beforeEach(function () {
            input = gpio.createInput(53, true);
        });

        it('calls nativeGpio.getLevel() once with the given pin', function () {
            var called = 0;

            nativeGpio.getLevel = function (pin) {
                assert(function () {
                    return pin === 53;
                });

                called += 1;
            };

            input();

            assert(function () {
                return called === 1;
            });
        });

        it('returns a boolean value', function () {
            nativeGpio.getLevel = function () {
                return 1;
            };

            assert(function () {
                return input() === true;
            });

            nativeGpio.getLevel = function () {
                return 0;
            };

            assert(function () {
                return input() === false;
            });
        });
    });

    describe('.createOutput()', function () {
        it('calls nativeGpio.configureAsOutput() once with the given pin', function () {
            var called = 0;

            nativeGpio.configureAsOutput = function (pin) {
                assert(function () {
                    return pin === 53;
                });

                called += 1;
            };

            gpio.createOutput(53, true);

            assert(function () {
                return called === 1;
            });
        });

        it('returns an output function', function () {
            assert(function () {
                return ts.isFunction(gpio.createOutput(0, true));
            }, function () {
                return ts.isFunction(gpio.createOutput(53, true));
            });
        });

        testAssertionErrors(gpio.createOutput);
    });

    describe('output()', function () {
        var output;

        beforeEach(function () {
            output = gpio.createOutput(53, true);
        });

        it('calls nativeGpio.setLevel() once with the given pin and a boolean level value', function () {
            var called = 0;

            nativeGpio.setLevel = function (pin, level) {
                assert(function () {
                    return pin === 53;
                }, function () {
                    return level === (called === 0);
                });

                called += 1;
            };

            output(1);
            output(0);

            assert(function () {
                return called === 2;
            });
        });

        it('returns undefined', function () {
            nativeGpio.setLevel = function () {
                return 1;
            };

            assert(function () {
                return ts.isUndefined(output(1));
            }, function () {
                return ts.isUndefined(output(0));
            });
        });
    });
});
