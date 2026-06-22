Blockly.defineBlocksWithJsonArray([

{
    "type":"function_parameter",

    "message0":"Parámetro %1 tipo %2",

    "args0":[

        {
            "type":"field_input",
            "name":"PARAM_NAME",
            "text":"a"
        },

        {
            "type":"field_dropdown",
            "name":"PARAM_TYPE",

            "options":[

                ["int","int"],
                ["float","float"],
                ["double","double"],
                ["string","string"],
                ["bool","bool"],
                ["char","char"]

            ]
        }

    ],

    "previousStatement":null,
    "nextStatement":null,

    "colour":45
},

{
    "type":"function_call_args",

    "message0":"Llamar %1 argumento %2 argumento %3",

    "args0":[

        {
            "type":"field_input",
            "name":"FUNCTION_NAME",
            "text":"sumar"
        },

        {
            "type":"field_input",
            "name":"ARG1",
            "text":"5"
        },

        {
            "type":"field_input",
            "name":"ARG2",
            "text":"3"
        }

    ],

    "previousStatement":null,
    "nextStatement":null,

    "colour":45
}

]);