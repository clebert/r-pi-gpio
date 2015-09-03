#ifndef R_PI_GPIO_H_
#define R_PI_GPIO_H_

#include <stdint.h>
#include <unistd.h>

namespace RPiGpio {

    enum Direction {
        INPUT,
        OUTPUT
    };

    bool getLevel(volatile uint32_t *memory, const uint32_t pin);

    void setLevel(volatile uint32_t *memory, const uint32_t pin, const bool level);

    void setDirection(volatile uint32_t *memory, const uint32_t pin, const Direction direction);

    volatile uint32_t *getMemory(const off_t offset);
}

#endif
