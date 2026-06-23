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

                {
                    kind: "block",
                    type: "create_variable_with_op"
                },

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
    ]

};
