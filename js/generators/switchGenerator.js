function generateSwitchBlock(block) {


switch(block.type) {

    case "switch_block":

        let valueBlock =
            block.getInputTargetBlock("VALUE");

        let expression = "";

        if(valueBlock) {

            expression =
                generateExpression(valueBlock);

        }

        let body =
            processStatement(
                block.getInputTargetBlock("BODY")
            );

        return "    switch("
            + expression
            + ")\n"
            + "    {\n"
            + body
            + "    }\n";

    case "case_block":

        let caseBody =
            processStatement(
                block.getInputTargetBlock("BODY")
            );

        return "        case "
            + block.getFieldValue("VALUE")
            + ":\n"
            + caseBody
            + "            break;\n";

    case "default_block":

        let defaultBody =
            processStatement(
                block.getInputTargetBlock("BODY")
            );

        return "        default:\n"
            + defaultBody;

}

return "";


}
