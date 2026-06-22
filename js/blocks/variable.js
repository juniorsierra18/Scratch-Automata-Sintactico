Blockly.defineBlocksWithJsonArray([

{
    "type":"create_variable",

    "message0":"Crear variable %1 tipo %2",

    "args0":[

        {
            "type":"field_input",
            "name":"VAR_NAME",
            "text":"edad"
        },

        {
            "type":"field_dropdown",
            "name":"VAR_TYPE",

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

    "colour":330
},

{
    "type":"assign_variable",

    "message0":"Asignar %1 = %2",

    "args0":[

        {
            "type":"field_input",
            "name":"VAR_NAME",
            "text":"edad"
        },

        {
            "type":"field_input",
            "name":"VALUE",
            "text":"18"
        }
    ],

    "previousStatement":null,
    "nextStatement":null,

    "colour":330
}

]);
Blockly.defineBlocksWithJsonArray([

{
    "type":"variable_reference",

    "message0":"variable %1",

    "args0":[

        {
            "type":"field_input",
            "name":"VAR_NAME",
            "text":"edad"
        }
    ],

    "output":"Number",

    "colour":330
}

]);