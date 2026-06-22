function generateFunctionParameterBlock(block){

    switch(block.type){

        case "function_parameter":

            return block.getFieldValue("PARAM_TYPE")
                + " "
                + block.getFieldValue("PARAM_NAME");

        case "function_call_args":

            return "    "
                + block.getFieldValue("FUNCTION_NAME")
                + "("
                + block.getFieldValue("ARG1")
                + ", "
                + block.getFieldValue("ARG2")
                + ");\n";

    }

    return "";
}