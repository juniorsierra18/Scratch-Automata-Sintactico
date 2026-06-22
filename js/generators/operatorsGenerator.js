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

        return generateArrayBlock(block);

    case "math_operation":

        const leftMath =
            generateExpression(
                block.getInputTargetBlock("LEFT")
            );

        const rightMath =
            generateExpression(
                block.getInputTargetBlock("RIGHT")
            );

        return "("
            + leftMath
            + " "
            + block.getFieldValue("OP")
            + " "
            + rightMath
            + ")";

    case "comparison":

        const leftComparison =
            generateExpression(
                block.getInputTargetBlock("LEFT")
            );

        const rightComparison =
            generateExpression(
                block.getInputTargetBlock("RIGHT")
            );

        return "("
            + leftComparison
            + " "
            + block.getFieldValue("OP")
            + " "
            + rightComparison
            + ")";

    case "logic_operator":

        const leftLogic =
            generateExpression(
                block.getInputTargetBlock("LEFT")
            );

        const rightLogic =
            generateExpression(
                block.getInputTargetBlock("RIGHT")
            );

        return "("
            + leftLogic
            + " "
            + block.getFieldValue("OP")
            + " "
            + rightLogic
            + ")";

    default:

        return "";
}


}
