#include "gpio.h"
#include "nan.h"

#include <errno.h>

namespace {

    volatile uint32_t *memory;

    static NAN_METHOD(getLevel) {
        const uint32_t pin = info[0]->ToInteger()->Value();

        const bool level = RPiGpio::getLevel(memory, pin);

        info.GetReturnValue().Set(level ? Nan::True() : Nan::False());
    }

    static NAN_METHOD(setLevel) {
        const uint32_t pin = info[0]->ToInteger()->Value();
        const bool level = info[1]->ToBoolean()->Value();

        RPiGpio::setLevel(memory, pin, level);

        info.GetReturnValue().Set(Nan::Undefined());
    }

    static NAN_METHOD(configureAsInput) {
        const uint32_t pin = info[0]->ToInteger()->Value();

        RPiGpio::setDirection(memory, pin, RPiGpio::INPUT);

        info.GetReturnValue().Set(Nan::Undefined());
    }

    static NAN_METHOD(configureAsOutput) {
        const uint32_t pin = info[0]->ToInteger()->Value();

        RPiGpio::setDirection(memory, pin, RPiGpio::OUTPUT);

        info.GetReturnValue().Set(Nan::Undefined());
    }

    static NAN_METHOD(init) {
        const uint32_t model = info[0]->ToInteger()->Value();

        if (model == 1) {
            memory = RPiGpio::getMemory(0x20200000);
        } else if (model == 2) {
            memory = RPiGpio::getMemory(0x3F200000);
        }

        if (memory == NULL) {
            return Nan::ThrowError(Nan::NanErrnoException(errno, "init", "", NULL));
        }

        info.GetReturnValue().Set(Nan::Undefined());
    }

    static NAN_MODULE_INIT(main) {
        Nan::Set(target, Nan::New<v8::String>("getLevel").ToLocalChecked(), Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getLevel)).ToLocalChecked());
        Nan::Set(target, Nan::New<v8::String>("setLevel").ToLocalChecked(), Nan::GetFunction(Nan::New<v8::FunctionTemplate>(setLevel)).ToLocalChecked());
        Nan::Set(target, Nan::New<v8::String>("configureAsInput").ToLocalChecked(), Nan::GetFunction(Nan::New<v8::FunctionTemplate>(configureAsInput)).ToLocalChecked());
        Nan::Set(target, Nan::New<v8::String>("configureAsOutput").ToLocalChecked(), Nan::GetFunction(Nan::New<v8::FunctionTemplate>(configureAsOutput)).ToLocalChecked());
        Nan::Set(target, Nan::New<v8::String>("init").ToLocalChecked(), Nan::GetFunction(Nan::New<v8::FunctionTemplate>(init)).ToLocalChecked());
    }

    NODE_MODULE(gpio, main);
}
