Blockly.defineBlocksWithJsonArray([

{
    "type":"function_void",

    "message0":"Función void %1",

    "args0":[

        {
            "type":"field_input",
            "name":"NAME",
            "text":"saludar"
        }

    ],

    "message1":"%1",

    "args1":[

        {
            "type":"input_statement",
            "name":"BODY"
        }

    ],

    "colour":30
},

{
    "type":"function_return",

    "message0":"Función int %1",

    "args0":[

        {
            "type":"field_input",
            "name":"NAME",
            "text":"sumar"
        }

    ],

    "message1":"%1",

    "args1":[

        {
            "type":"input_statement",
            "name":"BODY"
        }

    ],

    "colour":30
},

{
    "type":"call_function",

    "message0":"Llamar %1",

    "args0":[

        {
            "type":"field_input",
            "name":"NAME",
            "text":"saludar"
        }

    ],

    "previousStatement":null,
    "nextStatement":null,

    "colour":30
},

{
    "type":"return_block",

    "message0":"Retornar %1",

    "args0":[

        {
            "type":"input_value",
            "name":"VALUE"
        }

    ],

    "previousStatement":null,

    "colour":30
}

]);