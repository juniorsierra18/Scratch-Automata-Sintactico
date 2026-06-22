Blockly.defineBlocksWithJsonArray([

    // 1. Operaciones Matemáticas (+, -, *, /, %)
    {
        "type": "math_operation",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "LEFT"
            },
            {
                "type": "field_dropdown",
                "name": "OP",
                "options": [
                    ["+", "+"],
                    ["-", "-"],
                    ["*", "*"],
                    ["/", "/"],
                    ["%", "%"]
                ]
            },
            {
                "type": "input_value",
                "name": "RIGHT"
            }
        ],
        "output": "Number",
        "colour": 230
    },

    // 2. Operadores de Comparación (==, !=, >, <, >=, <=)
    {
        "type": "comparison",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "LEFT"
            },
            {
                "type": "field_dropdown",
                "name": "OP",
                "options": [
                    ["==", "=="],
                    ["!=", "!="],
                    [">", ">"],
                    ["<", "<"],
                    [">=", ">="],
                    ["<=", "<="]
                ]
            },
            {
                "type": "input_value",
                "name": "RIGHT"
            }
        ],
        "output": "Boolean",
        "colour": 65
    },

    // 3. Operadores Lógicos (&&, ||)
    {
        "type": "logic_operator",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "LEFT"
            },
            {
                "type": "field_dropdown",
                "name": "OP",
                "options": [
                    ["&&", "&&"],
                    ["||", "||"]
                ]
            },
            {
                "type": "input_value",
                "name": "RIGHT"
            }
        ],
        "output": "Boolean",
        "colour": 65
    },

    // 4. Valor Numérico Simple
    {
        "type": "number_value",
        "message0": "%1",
        "args0": [
            {
                "type": "field_number",
                "name": "VALUE",
                "value": 0
            }
        ],
        "output": "Number",
        "colour": 180
    },

    // 5. NUEVO: Crear variable y asignarle una operación/valor
    {
        "type": "create_variable_with_op",
        "message0": "%1 %2 = %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    ["int", "int"],
                    ["float", "float"],
                    ["double", "double"],
                    ["string", "string"],
                    ["bool", "bool"]
                ]
            },
            {
                "type": "field_input",
                "name": "VAR_NAME",
                "text": "nuevaVariable"
            },
            {
                "type": "input_value",
                "name": "VALUE"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 330
    },

    // 6. NUEVO: Asignar una operación/valor a una variable ya existente
    {
        "type": "assign_to_variable",
        "message0": "%1 = %2",
        "args0": [
            {
                "type": "field_input",
                "name": "VAR_NAME",
                "text": "variableExistente"
            },
            {
                "type": "input_value",
                "name": "VALUE"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 330
    }

]);
