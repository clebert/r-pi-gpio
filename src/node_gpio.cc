#include "gpio.h"
#include "nan.h"

#include <errno.h>

namespace {

    volatile uint32_t *memory;

    static NAN_METHOD(getLevel) {
        NanScope();

        const uint32_t pin = args[0]->ToInteger()->Value();

        const bool level = RPiGpio::getLevel(memory, pin);

        NanReturnValue(NanNew<v8::Boolean>(level));
    }

    static NAN_METHOD(setLevel) {
        NanScope();

        const uint32_t pin = args[0]->ToInteger()->Value();
        const bool level = args[1]->ToBoolean()->Value();

        RPiGpio::setLevel(memory, pin, level);

        NanReturnUndefined();
    }

    static NAN_METHOD(setAsInput) {
        NanScope();

        const uint32_t pin = args[0]->ToInteger()->Value();

        RPiGpio::setDirection(memory, pin, RPiGpio::INPUT);

        NanReturnUndefined();
    }

    static NAN_METHOD(setAsOutput) {
        NanScope();

        const uint32_t pin = args[0]->ToInteger()->Value();

        RPiGpio::setDirection(memory, pin, RPiGpio::OUTPUT);

        NanReturnUndefined();
    }

    void init(v8::Handle<v8::Object> exports) {
        memory = RPiGpio::getMemory();

        if (memory == NULL) {
            NanThrowError(node::ErrnoException(errno));

            return;
        }

        NODE_SET_METHOD(exports, "getLevel", getLevel);
        NODE_SET_METHOD(exports, "setLevel", setLevel);
        NODE_SET_METHOD(exports, "setAsInput", setAsInput);
        NODE_SET_METHOD(exports, "setAsOutput", setAsOutput);
    }

    NODE_MODULE(gpio, init);
}
