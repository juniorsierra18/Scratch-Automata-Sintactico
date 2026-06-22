Blockly.defineBlocksWithJsonArray([

{
    "type":"while_block",

    "message0":"MIENTRAS %1 HACER %2",

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

    "colour":290
},

{
    "type":"for_block",

    "message0":"PARA %1 DESDE %2 HASTA %3 HACER %4",

    "args0":[

        {
            "type":"field_input",
            "name":"VAR",
            "text":"i"
        },

        {
            "type":"field_number",
            "name":"START",
            "value":0
        },

        {
            "type":"field_number",
            "name":"END",
            "value":10
        },

        {
            "type":"input_statement",
            "name":"DO"
        }

    ],

    "previousStatement":null,
    "nextStatement":null,

    "colour":290
}

]);