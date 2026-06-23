// Función para generar las expresiones matemáticas y lógicas (Retornan un valor en texto)
function generateExpression(block) {
    if (!block) {
        return "";
    }

    switch (block.type) {
        case "number_value":
            return block.getFieldValue("VALUE");

        case "variable_reference":
            return block.getFieldValue("VAR_NAME");

        case "array_get":
            // Asume que tienes esta función en otro archivo (ej. arraysGenerator.js)
            return generateArrayBlock(block); 

        case "math_operation":
            const leftMath = generateExpression(block.getInputTargetBlock("LEFT"));
            const rightMath = generateExpression(block.getInputTargetBlock("RIGHT"));
            return "(" + leftMath + " " + block.getFieldValue("OP") + " " + rightMath + ")";

        case "comparison":
            const leftComparison = generateExpression(block.getInputTargetBlock("LEFT"));
            const rightComparison = generateExpression(block.getInputTargetBlock("RIGHT"));
            return "(" + leftComparison + " " + block.getFieldValue("OP") + " " + rightComparison + ")";

        case "logic_operator":
            const leftLogic = generateExpression(block.getInputTargetBlock("LEFT"));
            const rightLogic = generateExpression(block.getInputTargetBlock("RIGHT"));
            return "(" + leftLogic + " " + block.getFieldValue("OP") + " " + rightLogic + ")";

        default:
            return "";
    }
}

// Función para generar las sentencias de variables (Retornan una línea de código completa con ';')
function generateVariableStatement(block) {
    if (!block) {
        return "";
    }

    switch (block.type) {
        
        // Crea la estructura: int nuevaVariable = (5 + 5);
        case "create_variable_with_op":
            const type = block.getFieldValue("TYPE");
            const newVarName = block.getFieldValue("VAR_NAME");
            
            // Evaluamos la expresión matemática que se conectó (si no hay nada, ponemos 0)
            const valNew = generateExpression(block.getInputTargetBlock("VALUE")) || "0";
            
            return type + " " + newVarName + " = " + valNew + ";\n";

        // Crea la estructura: variableExistente = (10 * 2);
        case "assign_to_variable":
            const existVarName = block.getFieldValue("VAR_NAME");
            
            // Evaluamos la expresión matemática que se conectó
            const valExist = generateExpression(block.getInputTargetBlock("VALUE")) || "0";
            
            return existVarName + " = " + valExist + ";\n";

        default:
            return "";
    }
}
