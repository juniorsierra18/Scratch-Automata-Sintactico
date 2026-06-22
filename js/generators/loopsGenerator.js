function generateLoopBlock(block){

    switch(block.type){

        case "while_block":

            let condition =
                generateExpression(
                    block.getInputTargetBlock("CONDITION")
                );

            let body =
                processStatement(
                    block.getInputTargetBlock("DO")
                );

            return `
    while(${condition})
    {
${body}
    }
`;

        case "for_block":

            let variable =
                block.getFieldValue("VAR");

            let start =
                block.getFieldValue("START");

            let end =
                block.getFieldValue("END");

            let forBody =
                processStatement(
                    block.getInputTargetBlock("DO")
                );

            return `
    for(int ${variable} = ${start};
        ${variable} < ${end};
        ${variable}++)
    {
${forBody}
    }
`;
    }

    return "";
}