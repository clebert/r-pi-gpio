# r-pi-gpio
[![Build Status](https://travis-ci.org/clebert/r-pi-gpio.png?branch=master)](https://travis-ci.org/clebert/r-pi-gpio)
[![Coverage Status](https://coveralls.io/repos/clebert/r-pi-gpio/badge.png)](https://coveralls.io/r/clebert/r-pi-gpio)
[![Code Climate](https://codeclimate.com/github/clebert/r-pi-gpio.png)](https://codeclimate.com/github/clebert/r-pi-gpio)
[![NPM version](https://badge.fury.io/js/r-pi-gpio.png)](https://badge.fury.io/js/r-pi-gpio)

> A high performance, memory mapped, Node.js API for GPIO on Raspberry Pi.

## Installation

```sh
npm install r-pi-gpio --save
```

## Usage

### Node.js

```javascript
var Gpio = require('r-pi-gpio');
```

## API

### Gpio(pin: number) => void

```javascript
var gpio = new Gpio(10);
```

### gpio.getLevel() => boolean

```javascript
var level = gpio.getLevel();
```

### gpio.setLevel(level: boolean) => Object

```javascript
gpio.setLevel(true);
```

### gpio.setInput() => Object

```javascript
gpio.setInput();
```

### gpio.setOutput() => Object

```javascript
gpio.setOutput();
```

## Example

```sh
sudo node node_modules/r-pi-gpio/example/onoff.js
```

## Running the tests

To run the test suite first install the development dependencies:

```sh
npm install
```

then run the tests:

```sh
npm test
```

## License

Licensed under the MIT license.
