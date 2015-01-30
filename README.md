# r-pi-gpio

> A high performance, memory mapped, Node.js API for [GPIO](http://en.wikipedia.org/wiki/General-purpose_input/output) on the Raspberry Pi.

[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/clebert/r-pi-gpio/master/LICENSE)
[![npm](http://img.shields.io/npm/v/r-pi-gpio.svg?style=flat)](https://www.npmjs.org/package/r-pi-gpio)
[![downloads](http://img.shields.io/npm/dm/r-pi-gpio.svg?style=flat)](https://www.npmjs.org/package/r-pi-gpio)

[![build](http://img.shields.io/travis/clebert/r-pi-gpio/master.svg?style=flat)](https://travis-ci.org/clebert/r-pi-gpio)
[![coverage](http://img.shields.io/coveralls/clebert/r-pi-gpio/master.svg?style=flat)](https://coveralls.io/r/clebert/r-pi-gpio)
[![code climate](http://img.shields.io/codeclimate/github/clebert/r-pi-gpio.svg?style=flat)](https://codeclimate.com/github/clebert/r-pi-gpio)
[![dependencies](http://img.shields.io/david/clebert/r-pi-gpio.svg?style=flat)](https://david-dm.org/clebert/r-pi-gpio#info=dependencies&view=table)
[![devDependencies](http://img.shields.io/david/dev/clebert/r-pi-gpio.svg?style=flat)](https://david-dm.org/clebert/r-pi-gpio#info=devDependencies&view=table)

## Getting Started

### Installation

```sh
npm install r-pi-gpio --save
```

### Integration

```javascript
var gpio = require('r-pi-gpio');
```

## API

### gpio.input(pin)

Creates a new GPIO input function and returns it.

```javascript
var input = gpio.input(4);
```

### input()

Returns true if the input voltage level is high, and false otherwise.

```javascript
var level = input();
```

### gpio.output(pin)

Creates a new GPIO output function and returns it.

```javascript
var output = gpio.output(4);
```

### output(level)

Sets the output voltage level to high or low.

```javascript
output(true);
output(false);
```

## Example

This example needs access to the physical memory, so it must run as root.

```sh
sudo node node_modules/r-pi-gpio/example/onoff.js
```

![Example: onoff.png](https://raw.githubusercontent.com/clebert/r-pi-gpio/master/example/onoff.png)

## Raspberry Pi Model A/B (Rev 1.0)

| Assignment         | Pin | Pin | Assignment         |
| :----------------- | :-- | :-- | :----------------- |
| 3.3V               | 1   | 2   | 5V                 |
| GPIO 0 (SDA0)      | 3   | 4   | 5V                 |
| GPIO 1 (SCL0)      | 5   | 6   | GROUND             |
| GPIO 4             | 7   | 8   | GPIO 14 (TXD0)     |
| GROUND             | 9   | 10  | GPIO 15 (RXD0)     |
| GPIO 17            | 11  | 12  | GPIO 18            |
| GPIO 21            | 13  | 14  | GROUND             |
| GPIO 22            | 15  | 16  | GPIO 23            |
| 3.3V               | 17  | 18  | GPIO 24            |
| GPIO 10 (SPI_MOSI) | 19  | 20  | GROUND             |
| GPIO 9  (SPI_MISO) | 21  | 22  | GPIO 25            |
| GPIO 11 (SPI_SCLK) | 23  | 24  | GPIO 8 (SPI_CE0_N) |
| GROUND             | 25  | 26  | GPIO 7 (SPI_CE1_N) |

## Raspberry Pi Model A/B (Rev 2.0)

| Assignment         | Pin | Pin | Assignment         |
| :----------------- | :-- | :-- | :----------------- |
| 3.3V               | 1   | 2   | 5V                 |
| GPIO 2 (SDA1)      | 3   | 4   | 5V                 |
| GPIO 3 (SCL1)      | 5   | 6   | GROUND             |
| GPIO 4             | 7   | 8   | GPIO 14 (TXD0)     |
| GROUND             | 9   | 10  | GPIO 15 (RXD0)     |
| GPIO 17            | 11  | 12  | GPIO 18            |
| GPIO 27            | 13  | 14  | GROUND             |
| GPIO 22            | 15  | 16  | GPIO 23            |
| 3.3V               | 17  | 18  | GPIO 24            |
| GPIO 10 (SPI_MOSI) | 19  | 20  | GROUND             |
| GPIO 9  (SPI_MISO) | 21  | 22  | GPIO 25            |
| GPIO 11 (SPI_SCLK) | 23  | 24  | GPIO 8 (SPI_CE0_N) |
| GROUND             | 25  | 26  | GPIO 7 (SPI_CE1_N) |

## Raspberry Pi Model B+

| Assignment         | Pin | Pin | Assignment         |
| :----------------- | :-- | :-- | :----------------- |
| 3.3V               | 1   | 2   | 5V                 |
| GPIO 2 (SDA1)      | 3   | 4   | 5V                 |
| GPIO 3 (SCL1)      | 5   | 6   | GROUND             |
| GPIO 4             | 7   | 8   | GPIO 14 (TXD0)     |
| GROUND             | 9   | 10  | GPIO 15 (RXD0)     |
| GPIO 17            | 11  | 12  | GPIO 18            |
| GPIO 27            | 13  | 14  | GROUND             |
| GPIO 22            | 15  | 16  | GPIO 23            |
| 3.3V               | 17  | 18  | GPIO 24            |
| GPIO 10 (SPI_MOSI) | 19  | 20  | GROUND             |
| GPIO 9  (SPI_MISO) | 21  | 22  | GPIO 25            |
| GPIO 11 (SPI_SCLK) | 23  | 24  | GPIO 8 (SPI_CE0_N) |
| GROUND             | 25  | 26  | GPIO 7 (SPI_CE1_N) |
| ID_SD              | 27  | 28  | ID_SC              |
| GPIO 5             | 29  | 30  | GROUND             |
| GPIO 6             | 31  | 32  | GPIO 12            |
| GPIO 13            | 33  | 34  | GROUND             |
| GPIO 19            | 35  | 36  | GPIO 16            |
| GPIO 26            | 37  | 38  | GPIO 20            |
| GROUND             | 39  | 40  | GPIO 21            |

## Links

- [RPi Low-level Peripherals](http://elinux.org/RPi_Low-level_peripherals)
- [BCM2835 ARM Peripherals ](http://www.raspberrypi.org/wp-content/uploads/2012/02/BCM2835-ARM-Peripherals.pdf)
- [GPIO Examples - A single LED](https://projects.drogon.net/raspberry-pi/gpio-examples/tux-crossing/gpio-examples-1-a-single-led/)
- [Standard Resistor Values](http://www.petervis.com/electronics/Standard_Resistor_Values/330R.html)

## Running Tests

To run the test suite first install the development dependencies:

```sh
npm install
```

then run the tests:

```sh
npm test
```
