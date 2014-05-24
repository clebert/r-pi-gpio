{
    "targets": [
        {
            "target_name": "gpio",
            "sources": [
                "src/gpio.cc",
                "src/node_gpio.cc"
            ],
            "include_dirs" : [
                "<!(node -e \"require('nan')\")"
            ]
        }
    ]
}
