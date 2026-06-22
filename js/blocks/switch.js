Blockly.defineBlocksWithJsonArray([

{
"type":"switch_block",


"message0":"SWITCH %1",

"args0":[

    {
        "type":"input_value",
        "name":"VALUE"
    }

],

"message1":"%1",

"args1":[

    {
        "type":"input_statement",
        "name":"BODY"
    }

],

"previousStatement":null,
"nextStatement":null,

"colour":30


},

{
"type":"case_block",


"message0":"CASE %1",

"args0":[

    {
        "type":"field_number",
        "name":"VALUE",
        "value":1
    }

],

"message1":"%1",

"args1":[

    {
        "type":"input_statement",
        "name":"BODY"
    }

],

"previousStatement":null,
"nextStatement":null,

"colour":30


},

{
"type":"default_block",


"message0":"DEFAULT",

"message1":"%1",

"args1":[

    {
        "type":"input_statement",
        "name":"BODY"
    }

],

"previousStatement":null,
"nextStatement":null,

"colour":30


}

]);
