function generateArrayBlock(block) {

switch(block.type) {

    case "array_create":

        return "    "
            + block.getFieldValue("TYPE")
            + " "
            + block.getFieldValue("NAME")
            + "["
            + block.getFieldValue("SIZE")
            + "];\n";

    case "array_set":

        let valueBlock =
            block.getInputTargetBlock("VALUE");

        let value = "0";

        if (
            valueBlock &&
            typeof generateExpression === "function"
        ) {

            value =
                generateExpression(valueBlock);

        }

        return "    "
            + block.getFieldValue("NAME")
            + "["
            + block.getFieldValue("INDEX")
            + "] = "
            + value
            + ";\n";

    case "array_get":

        return block.getFieldValue("NAME")
            + "["
            + block.getFieldValue("INDEX")
            + "]";
}

return "";


}
