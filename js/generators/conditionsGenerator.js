function generateConditionBlock(block){

    switch(block.type){

        case "if_block":

            let condition =
                generateExpression(
                    block.getInputTargetBlock("CONDITION")
                );

            let body =
                processStatement(
                    block.getInputTargetBlock("DO")
                );

            return `
    if(${condition})
    {
${body}
    }
`;

        case "if_else_block":

            let cond =
                generateExpression(
                    block.getInputTargetBlock("CONDITION")
                );

            let ifBody =
                processStatement(
                    block.getInputTargetBlock("DO")
                );

            let elseBody =
                processStatement(
                    block.getInputTargetBlock("ELSE")
                );

            return `
    if(${cond})
    {
${ifBody}
    }
    else
    {
${elseBody}
    }
`;
    }

    return "";
}