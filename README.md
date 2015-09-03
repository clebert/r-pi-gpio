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

### gpio.init(callback)

Creates the memory mapping with a device-specific memory offset.

**You must call this function only once and before any other function.**

```javascript
gpio.init(function (error) {
    if (error) {
        ...
    } else {
        ...
    }
});
```

### gpio.createInput(pin)

Creates a new GPIO input function and returns it.

```javascript
var input = gpio.createInput(4);
```

### input()

Returns true if the input voltage level is high, and false otherwise.

```javascript
var level = input();
```

### gpio.createOutput(pin)

Creates a new GPIO output function and returns it.

```javascript
var output = gpio.createOutput(4);
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
sudo node examples/onoff.js
```

![Example: onoff.png](https://raw.githubusercontent.com/clebert/r-pi-gpio/master/resources/onoff.png)

> A quick word about the electronics involved. LEDs are Light Emitting Diodes and the diode part is important for us – they only pass electricity one way, so we need to make sure we put them in the right way round. They have a long leg and a slightly shorter leg. The long leg goes to the plus side and the shorter leg to the negative (or 0v) side. If we’re cut the legs short (as I have done here), then another way is to look at the side of the LED – there will be a flat section. Think of the flat as a minus sign and connect that to the 0v side of the circuit.
>
> If we allow too much current through the LED, it will burn very bright for a very short period of time before it burns out, so we need a resistor to limit the current. Calculating the resistor value is not difficult but for now, just use anything from 270Ω to 330Ω. Anything higher will make the LED dimmer.
>
> -- [GPIO Examples - A single LED](https://projects.drogon.net/raspberry-pi/gpio-examples/tux-crossing/gpio-examples-1-a-single-led/)

## Raspberry Pi GPIO Pin Layout

### Raspberry Pi Model A/B (Rev 1.0)

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

### Raspberry Pi Model A/B (Rev 2.0)

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

### Raspberry Pi Model B+ / Raspberry Pi 2 Model B

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

## Related Links

- [RPi Low-level Peripherals](http://elinux.org/RPi_Low-level_peripherals)
- [BCM2835 ARM Peripherals ](http://www.raspberrypi.org/wp-content/uploads/2012/02/BCM2835-ARM-Peripherals.pdf)
- [GPIO Examples - A single LED](https://projects.drogon.net/raspberry-pi/gpio-examples/tux-crossing/gpio-examples-1-a-single-led/)
- [Standard Resistor Values](http://www.petervis.com/electronics/Standard_Resistor_Values/330R.html)
- [Pull-up and Pull-down Resistors](http://www.bit-101.com/blog/?p=3813)

## Running Tests

To run the test suite first install the development dependencies:

```sh
npm install
```

then run the tests:

```sh
npm test
```
