Blockly.defineBlocksWithJsonArray([
{
"type":"array_create",

"message0":"Crear arreglo %1 tipo %2 tamaño %3",

"args0":[

    {
        "type":"field_input",
        "name":"NAME",
        "text":"numeros"
    },

    {
        "type":"field_dropdown",
        "name":"TYPE",

        "options":[

            ["int","int"],
            ["float","float"],
            ["double","double"],
            ["string","string"]
        ]
    },

    {
        "type":"field_number",
        "name":"SIZE",
        "value":10,
        "min":1
    }
],

"previousStatement":null,
"nextStatement":null,

"colour":210


},

{
"type":"array_set",

"message0":"%1 [ %2 ] = %3",

"args0":[

    {
        "type":"field_input",
        "name":"NAME",
        "text":"numeros"
    },

    {
        "type":"field_number",
        "name":"INDEX",
        "value":0
    },

    {
        "type":"input_value",
        "name":"VALUE"
    }
],

"previousStatement":null,
"nextStatement":null,

"colour":210


},

{
"type":"array_get",


"message0":"%1 [ %2 ]",

"args0":[

    {
        "type":"field_input",
        "name":"NAME",
        "text":"numeros"
    },

    {
        "type":"field_number",
        "name":"INDEX",
        "value":0
    }
],

"output":"Number",

"colour":210


}

]);
