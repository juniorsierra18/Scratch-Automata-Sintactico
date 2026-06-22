Blockly.defineBlocksWithJsonArray([

{
    "type":"math_operation",

    "message0":"%1 %2 %3",

    "args0":[

        {
            "type":"input_value",
            "name":"LEFT"
        },

        {
            "type":"field_dropdown",
            "name":"OP",

            "options":[

                ["+","+"],
                ["-","-"],
                ["*","*"],
                ["/","/"],
                ["%","%"]
            ]
        },

        {
            "type":"input_value",
            "name":"RIGHT"
        }
    ],

    "output":"Number",

    "colour":230
},

{
    "type":"comparison",

    "message0":"%1 %2 %3",

    "args0":[

        {
            "type":"input_value",
            "name":"LEFT"
        },

        {
            "type":"field_dropdown",
            "name":"OP",

            "options":[

                ["==","=="],
                ["!=","!="],
                [">",">"],
                ["<","<"],
                [">=",">="],
                ["<=","<="]
            ]
        },

        {
            "type":"input_value",
            "name":"RIGHT"
        }
    ],

    "output":"Boolean",

    "colour":65
},

{
    "type":"logic_operator",

    "message0":"%1 %2 %3",

    "args0":[

        {
            "type":"input_value",
            "name":"LEFT"
        },

        {
            "type":"field_dropdown",
            "name":"OP",

            "options":[

                ["&&","&&"],
                ["||","||"]
            ]
        },

        {
            "type":"input_value",
            "name":"RIGHT"
        }
    ],

    "output":"Boolean",

    "colour":65
}

]);
Blockly.defineBlocksWithJsonArray([

{
    "type":"number_value",

    "message0":"%1",

    "args0":[

        {
            "type":"field_number",
            "name":"VALUE",
            "value":0
        }
    ],

    "output":"Number",

    "colour":180
}

]);