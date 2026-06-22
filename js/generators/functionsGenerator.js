function generateFunctionBlock(block){

    switch(block.type){

        case "function_void":

            let body =
                processStatement(
                    block.getInputTargetBlock("BODY")
                );

            return `
void ${block.getFieldValue("NAME")}()
{
${body}
}
`;

        case "function_return":

            let parameterList = [];

            let parameterBlock =
                block.getInputTargetBlock("PARAMS");

            while(parameterBlock){

                if(
                    parameterBlock.type ===
                    "function_parameter"
                ){

                    parameterList.push(
                        generateFunctionParameterBlock(
                            parameterBlock
                        )
                    );
                }

                parameterBlock =
                    parameterBlock.getNextBlock();
            }

            let bodyReturn =
                processStatement(
                    block.getInputTargetBlock("BODY")
                );

            return `
int ${block.getFieldValue("NAME")}(
${parameterList.join(", ")}
)
{
${bodyReturn}
}
`;

        case "call_function":

            return `
    ${block.getFieldValue("NAME")}();
`;

        case "return_block":

            let valueBlock =
                block.getInputTargetBlock("VALUE");

            let value = "";

            if(valueBlock){

                value =
                    generateExpression(valueBlock);
            }

            return `
    return ${value};
`;

    }

    return "";
}