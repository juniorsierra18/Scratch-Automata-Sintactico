Blockly.defineBlocksWithJsonArray([

{
    "type":"cout_block",

    "message0":"Mostrar %1",

    "args0":[

        {
            "type":"field_input",
            "name":"TEXT",
            "text":"Hola Mundo"
        }
    ],

    "previousStatement":null,
    "nextStatement":null,

    "colour":120
},
{
    "type":"cout_variable",

    "message0":"Mostrar variable %1",

    "args0":[

        {
            "type":"field_input",
            "name":"VAR_NAME",
            "text":"edad"
        }
    ],

    "previousStatement":null,
    "nextStatement":null,

    "colour":120
},

{
    "type":"cin_block",

    "message0":"Leer variable %1",

    "args0":[

        {
            "type":"field_input",
            "name":"VAR_NAME",
            "text":"edad"
        }
    ],

    "previousStatement":null,
    "nextStatement":null,

    "colour":120
}

]);