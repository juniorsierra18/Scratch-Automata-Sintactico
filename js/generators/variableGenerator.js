function generateVariableBlock(block){

    switch(block.type){

        case "create_variable":

            return `
    ${block.getFieldValue("VAR_TYPE")}
    ${block.getFieldValue("VAR_NAME")};
`;

        case "assign_variable":

            return `
    ${block.getFieldValue("VAR_NAME")}
    =
    ${block.getFieldValue("VALUE")};
`;
    }

    return "";
}