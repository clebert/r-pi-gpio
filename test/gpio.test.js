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
            method(NaN);
        }, function (exception) {
            return exception.name === 'AssertionError';
        }, function (exception) {
            return /ts\.isInteger\(pin\)/.test(exception);
        });

        assert.throws(function () {
            method(-1);
        }, function (exception) {
            return exception.name === 'AssertionError';
        }, function (exception) {
            return /pin >= 0/.test(exception);
        });

        assert.throws(function () {
            method(54);
        }, function (exception) {
            return exception.name === 'AssertionError';
        }, function (exception) {
            return /pin <= 53/.test(exception);
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

    describe('.input()', function () {
        it('calls nativeGpio.configureAsInput() once with the given pin', function () {
            var called = 0;

            nativeGpio.configureAsInput = function (pin) {
                assert(function () {
                    return pin === 53;
                });

                called += 1;
            };

            gpio.input(53);

            assert(function () {
                return called === 1;
            });
        });

        it('returns an input function', function () {
            assert(function () {
                return ts.isFunction(gpio.input(0));
            }, function () {
                return ts.isFunction(gpio.input(53));
            });
        });

        testAssertionErrors(gpio.input);
    });

    describe('input()', function () {
        it('calls nativeGpio.getLevel() once with the given pin', function () {
            var called = 0;

            nativeGpio.getLevel = function (pin) {
                assert(function () {
                    return pin === 53;
                });

                called += 1;
            };

            gpio.input(53)();

            assert(function () {
                return called === 1;
            });
        });

        it('returns a boolean value', function () {
            nativeGpio.getLevel = function () {
                return 0;
            };

            assert(function () {
                return gpio.input(53)() === false;
            });

            nativeGpio.getLevel = function () {
                return 1;
            };

            assert(function () {
                return gpio.input(53)() === true;
            });
        });
    });

    describe('.output()', function () {
        it('calls nativeGpio.configureAsOutput() once with the given pin', function () {
            var called = 0;

            nativeGpio.configureAsOutput = function (pin) {
                assert(function () {
                    return pin === 53;
                });

                called += 1;
            };

            gpio.output(53);

            assert(function () {
                return called === 1;
            });
        });

        it('returns an output function', function () {
            assert(function () {
                return ts.isFunction(gpio.output(0));
            }, function () {
                return ts.isFunction(gpio.output(53));
            });
        });

        testAssertionErrors(gpio.output);
    });

    describe('output()', function () {
        it('calls nativeGpio.setLevel() once with the given pin and a level as boolean value', function () {
            var called = 0;

            nativeGpio.setLevel = function (pin, level) {
                assert(function () {
                    return pin === 53;
                }, function () {
                    return level === called > 0;
                });

                called += 1;
            };

            gpio.output(53)(0);
            gpio.output(53)(1);

            assert(function () {
                return called === 2;
            });
        });

        it('returns undefined', function () {
            nativeGpio.setLevel = function () {
                return 1;
            };

            assert(function () {
                return ts.isUndefined(gpio.output(53)());
            });
        });
    });
});
