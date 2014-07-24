/* global beforeEach, describe, it */

'use strict';

var assert = require('extended-assert');
var mock = assert.requireFileMock(__dirname, '../build/Release/gpio.node', {});
var gpio = require('../lib/gpio');

describe('gpio', function () {
    beforeEach(function () {
        mock.getLevel = function () {};
        mock.setLevel = function () {};
        mock.setAsInput = function () {};
        mock.setAsOutput = function () {};
    });

    describe('.input()', function () {
        it('throws an error', function () {
            var message = 'Illegal argument: pin';

            assert.throwsError(function () {
                gpio.input();
            }, 'Error', message);

            assert.throwsError(function () {
                gpio.input(NaN);
            }, 'Error', message);

            assert.throwsError(function () {
                gpio.input(-1);
            }, 'Error', message);

            assert.throwsError(function () {
                gpio.input(54);
            }, 'Error', message);
        });

        it('calls native gpio.setAsInput() once with the given pin', function () {
            var called = 0;

            mock.setAsInput = function (pin) {
                assert.strictEqual(pin, 53);

                called += 1;
            };

            gpio.input(53);

            assert.strictEqual(called, 1);
        });

        it('returns a function', function () {
            assert.strictEqual(typeof gpio.input(0), 'function');
            assert.strictEqual(typeof gpio.input(53), 'function');
        });
    });

    describe('input()', function () {
        it('calls native gpio.getLevel() once with the given pin', function () {
            var called = 0;

            mock.getLevel = function (pin) {
                assert.strictEqual(pin, 53);

                called += 1;
            };

            gpio.input(53)();

            assert.strictEqual(called, 1);
        });

        it('returns a boolean value', function () {
            mock.getLevel = function () {
                return 0;
            };

            assert.strictEqual(gpio.input(53)(), false);

            mock.getLevel = function () {
                return 1;
            };

            assert.strictEqual(gpio.input(53)(), true);
        });
    });

    describe('.output()', function () {
        it('throws an error', function () {
            var message = 'Illegal argument: pin';

            assert.throwsError(function () {
                gpio.output();
            }, 'Error', message);

            assert.throwsError(function () {
                gpio.output(NaN);
            }, 'Error', message);

            assert.throwsError(function () {
                gpio.output(-1);
            }, 'Error', message);

            assert.throwsError(function () {
                gpio.output(54);
            }, 'Error', message);
        });

        it('calls native gpio.setAsOutput() once with the given pin', function () {
            var called = 0;

            mock.setAsOutput = function (pin) {
                assert.strictEqual(pin, 53);

                called += 1;
            };

            gpio.output(53);

            assert.strictEqual(called, 1);
        });

        it('returns a function', function () {
            assert.strictEqual(typeof gpio.output(0), 'function');
            assert.strictEqual(typeof gpio.output(53), 'function');
        });
    });

    describe('output()', function () {
        it('calls native gpio.setLevel() once with the given pin and a level as boolean value', function () {
            var called = 0;

            mock.setLevel = function (pin, level) {
                assert.strictEqual(pin, 53);
                assert.strictEqual(level, called > 0);

                called += 1;
            };

            gpio.output(53)(0);
            gpio.output(53)(1);

            assert.strictEqual(called, 2);
        });

        it('returns undefined', function () {
            mock.setLevel = function () {
                return 1;
            };

            assert.strictEqual(gpio.output(53)(), void 0);
        });
    });
});
