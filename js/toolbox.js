const toolbox = {

    kind: "categoryToolbox",

    contents: [

        /* =====================================
           VARIABLES
        ===================================== */

        {
            kind: "category",
            name: "Variables",
            colour: "#ff6680",

            contents: [

                {
                    kind: "block",
                    type: "create_variable"
                },

                {
                    kind: "block",
                    type: "assign_variable"
                },

                {
                    kind: "block",
                    type: "variable_reference"
                },

                // NUEVO: Crear variable y asignarle una operación
                {
                    kind: "block",
                    type: "create_variable_with_op"
                },

                // NUEVO: Asignar operación a variable existente
                {
                    kind: "block",
                    type: "assign_to_variable"
                }

            ]
        },

        /* =====================================
           ENTRADA / SALIDA
        ===================================== */

        {
            kind: "category",
            name: "Entrada / Salida",
            colour: "#4CAF50",

            contents: [

                {
                    kind: "block",
                    type: "cout_block"
                },

                {
                    kind: "block",
                    type: "cout_variable"
                },

                {
                    kind: "block",
                    type: "cin_block"
                }

            ]
        },

        /* =====================================
           OPERADORES
        ===================================== */

        {
            kind: "category",
            name: "Operadores",
            colour: "#2196F3",

            contents: [

                {
                    kind: "block",
                    type: "number_value"
                },

                {
                    kind: "block",
                    type: "math_operation"
                },

                {
                    kind: "block",
                    type: "comparison"
                },

                {
                    kind: "block",
                    type: "logic_operator"
                }

            ]
        },

        /* =====================================
           CONDICIONALES
        ===================================== */

        {
            kind: "category",
            name: "Condicionales",
            colour: "#FF9800",

            contents: [

                {
                    kind: "block",
                    type: "if_block"
                },

                {
                    kind: "block",
                    type: "if_else_block"
                },

                {
                    kind: "block",
                    type: "switch_block"
                },

                {
                    kind: "block",
                    type: "case_block"
                },

                {
                    kind: "block",
                    type: "default_block"
                }

            ]

        },

        /* =====================================
           CICLOS
        ===================================== */

        {
            kind: "category",
            name: "Ciclos",
            colour: "#9C27B0",

            contents: [

                {
                    kind: "block",
                    type: "while_block"
                },

                {
                    kind: "block",
                    type: "for_block"
                }

            ]
        },

        /*
        =====================================
           FUNCIONES
        ===================================== 

        {
            kind: "category",
            name: "Funciones",
            colour: "#795548",

            contents: [

                {
                    kind: "block",
                    type: "function_void"
                },

                {
                    kind: "block",
                    type: "function_return"
                },

                {
                    kind: "block",
                    type: "call_function"
                },

                {
                    kind: "block",
                    type: "return_block"
                }, 
                
                {
                    kind: "block",
                    type: "function_parameter"
                },

                {
                    kind: "block",
                    type: "function_call_args"
                }

            ]
        },

        =====================================
           ARREGLOS
           (ENTREGA 6)
        =====================================

        {
            kind: "category",
            name: "Arreglos",
            colour: "#607D8B",

            contents: [

                {
                    kind: "block",
                    type: "array_create"
                },

                {
                    kind: "block",
                    type: "array_set"
                },

                {
                    kind: "block",
                    type: "array_get"
                }

            ]

        }
        */
    ]

};
