Blockly.defineBlocksWithJsonArray([

{
    "type":"if_block",

    "message0":"SI %1 HACER %2",

    "args0":[

        {
            "type":"input_value",
            "name":"CONDITION"
        },

        {
            "type":"input_statement",
            "name":"DO"
        }

    ],

    "previousStatement":null,
    "nextStatement":null,

    "colour":20
},

{
    "type":"if_else_block",

    "message0":"SI %1 HACER %2 SINO %3",

    "args0":[

        {
            "type":"input_value",
            "name":"CONDITION"
        },

        {
            "type":"input_statement",
            "name":"DO"
        },

        {
            "type":"input_statement",
            "name":"ELSE"
        }

    ],

    "previousStatement":null,
    "nextStatement":null,

    "colour":20
}

]);