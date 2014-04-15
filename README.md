# r-pi-gpio

> A Node.js API for GPIO on Raspberry Pi.

## Installation

    $ npm install r-pi-gpio --save

## Usage

### Node.js

    var GPIO = require('r-pi-gpio').GPIO;

### API

#### Constructor

* GPIO(id: number, direction: string) => Object

#### Static methods

* GPIO.input(id: number) => Object
* GPIO.output(id: number) => Object

#### Instance methods

* GPIO.prototype.destroy() => void
* GPIO.prototype.write(value: boolean) => Object
* GPIO.prototype.read() => boolean

## Running the tests

To run the test suite first install the development dependencies:

    $ npm install

then run the tests:

    $ npm test

## License

Licensed under the MIT license.
