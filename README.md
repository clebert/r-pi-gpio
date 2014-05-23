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
var gpio = new Gpio(18);
```

### gpio.getLevel() => boolean

```javascript
var level = gpio.getLevel();
```

### gpio.setLevel(level: boolean) => Object

```javascript
gpio.setLevel(true);

setTimeout(function () {
    gpio.setLevel(false);
}, 2000);
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

## Raspberry Pi GPIO Pin Layout (Revision 1)

| Assignment          | Pin | Pin | Assignment          |
| :------------------ | :-- | :-- | :------------------ |
| 3.3V                | 1   | 2   | 5V                  |
| GPIO 0 (I2C0 SDA)   | 3   | 4   | DNC                 |
| GPIO 1 (I2C0 SCL)   | 5   | 6   | GROUND              |
| GPIO 4              | 7   | 8   | GPIO 14 (UART TXD)  |
| DNC                 | 9   | 10  | GPIO 15 (UART RXD)  |
| GPIO 17             | 11  | 12  | GPIO 18             |
| GPIO 21             | 13  | 14  | DNC                 |
| GPIO 22             | 15  | 16  | GPIO 23             |
| DNC                 | 17  | 18  | GPIO 24             |
| GPIO 10 (SP10 MOSI) | 19  | 20  | DNC                 |
| GPIO 9  (SP10 MISO) | 21  | 22  | GPIO 25             |
| GPIO 11 (SP10 SCLK) | 23  | 24  | GPIO 8 (SP10 CE0 N) |
| DNC                 | 25  | 26  | GPIO 7 (SP10 CE1 N) |

## Raspberry Pi GPIO Pin Layout (Revision 2)

| Assignment          | Pin | Pin | Assignment          |
| :------------------ | :-- | :-- | :------------------ |
| 3.3V                | 1   | 2   | 5V                  |
| GPIO 2 (I2C1 SDA)   | 3   | 4   | 5V                  |
| GPIO 3 (I2C1 SCL)   | 5   | 6   | GROUND              |
| GPIO 4              | 7   | 8   | GPIO 14 (UART TXD)  |
| GROUND              | 9   | 10  | GPIO 15 (UART RXD)  |
| GPIO 17             | 11  | 12  | GPIO 18             |
| GPIO 27             | 13  | 14  | GROUND              |
| GPIO 22             | 15  | 16  | GPIO 23             |
| 3.3V                | 17  | 18  | GPIO 24             |
| GPIO 10 (SP10 MOSI) | 19  | 20  | GROUND              |
| GPIO 9  (SP10 MISO) | 21  | 22  | GPIO 25             |
| GPIO 11 (SP10 SCLK) | 23  | 24  | GPIO 8 (SP10 CE0 N) |
| GROUND              | 25  | 26  | GPIO 7 (SP10 CE1 N) |

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
