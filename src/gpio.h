#ifndef R_PI_GPIO_H_
#define R_PI_GPIO_H_

#include <stdint.h>

namespace RPiGpio {

    enum Direction {
        INPUT,
        OUTPUT
    };

    bool getLevel(volatile uint32_t *memory, const uint32_t pin);

    volatile uint32_t *getMemory();

    void setDirection(volatile uint32_t *memory, const uint32_t pin, const Direction direction);

    void setLevel(volatile uint32_t *memory, const uint32_t pin, const bool level);
}

#endif