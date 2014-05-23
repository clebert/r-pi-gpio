/* global describe, it */

'use strict';

var assert = require('extended-assert');
var mock = assert.requireMock(__dirname, '../build/Release/gpio.node', {});
var Gpio = require('../index.js');

describe('Gpio()', function () {

    it('should throw an illegal-arguments error', function () {
        assert.throwsError(function () {
            return new Gpio();
        }, 'TypeError', '(!>number) => void');
    });

    it('should throw a missing-new-keyword error', function () {
        assert.throwsError(function () {
            /* jshint -W064 */

            Gpio(0);
        }, 'Error', 'Missing new keyword.');
    });

    it('should not throw an invalid-pin error', function () {
        var type = 'Error';
        var message = 'Invalid pin.';

        assert.doesNotThrowError(function () {
            return new Gpio(0);
        }, type, message);

        assert.doesNotThrowError(function () {
            return new Gpio(53);
        }, type, message);
    });

    it('should throw an invalid-pin error', function () {
        var type = 'Error';
        var message = 'Invalid pin.';

        assert.throwsError(function () {
            return new Gpio(-1);
        }, type, message);

        assert.throwsError(function () {
            return new Gpio(54);
        }, type, message);

        assert.throwsError(function () {
            return new Gpio(0.1);
        }, type, message);

        assert.throwsError(function () {
            return new Gpio(53.1);
        }, type, message);
    });

    describe('.getLevel()', function () {

        it('should call the corresponding mock funtion with pin-53 as ' +
            'argument and return its return value', function () {

            var gpio = new Gpio(53);
            var returnValue = {};

            mock.getLevel = function (pin) {
                assert.strictEqual(pin, 53);

                return returnValue;
            };

            assert.strictEqual(gpio.getLevel(), returnValue);
        });
    });

    describe('.setLevel()', function () {

        it('should call the corresponding mock funtion with pin-53 and true ' +
            'as arguments and return `this`', function () {

            var gpio = new Gpio(53);

            var called;

            mock.setLevel = function (pin, level) {
                assert.strictEqual(pin, 53);
                assert.strictEqual(level, true);

                called = true;
            };

            assert.strictEqual(gpio.setLevel(1), gpio);
            assert.strictEqual(called, true);
        });

        it('should call the corresponding mock funtion with pin-10 and false ' +
            'as arguments and return `this`', function () {

            var gpio = new Gpio(10);

            var called;

            mock.setLevel = function (pin, level) {
                assert.strictEqual(pin, 10);
                assert.strictEqual(level, false);

                called = true;
            };

            assert.strictEqual(gpio.setLevel(0), gpio);
            assert.strictEqual(called, true);
        });
    });

    describe('.setInput()', function () {

        it('should call the corresponding mock funtion with pin-53 as ' +
            'argument and return `this`', function () {

            var gpio = new Gpio(53);

            var called;

            mock.setInput = function (pin) {
                assert.strictEqual(pin, 53);

                called = true;
            };

            assert.strictEqual(gpio.setInput(), gpio);
            assert.strictEqual(called, true);
        });
    });

    describe('.setOutput()', function () {

        it('should call the corresponding mock funtion with pin-53 as ' +
            'argument and return `this`', function () {

            var gpio = new Gpio(53);

            var called;

            mock.setOutput = function (pin) {
                assert.strictEqual(pin, 53);

                called = true;
            };

            assert.strictEqual(gpio.setOutput(), gpio);
            assert.strictEqual(called, true);
        });
    });
});
