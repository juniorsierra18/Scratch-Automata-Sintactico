function buildCppCode() {

    let functionsCode = "";
    let mainCode = "";

    const blocks = workspace.getTopBlocks(true);

    blocks.forEach(block => {

        if (
            block.type === "function_void" ||
            block.type === "function_return"
        ) {

            functionsCode += generateFunctionBlock(block);

        } else {

            mainCode += processStatement(block);

        }

    });

    let cppCode = "";

    cppCode += "#include <iostream>\n";
    cppCode += "#include <string>\n\n";

    cppCode += "using namespace std;\n\n";

    cppCode += functionsCode + "\n";

    cppCode += "int main()\n";
    cppCode += "{\n";

    cppCode += mainCode;

    cppCode += "\n";
    cppCode += "    return 0;\n";
    cppCode += "}\n";

    return cppCode;


}

function processStatement(block) {


    let result = "";

    while (block) {

        /* VARIABLES */

        if (
            block.type === "create_variable" ||
            block.type === "assign_variable"
        ) {

            result += generateVariableBlock(block);

        }

        /* ENTRADA / SALIDA */

        else if (
            block.type === "cout_block" ||
            block.type === "cout_variable" ||
            block.type === "cin_block"
        ) {

            result += generateIOBlock(block);

        }

        /* CONDICIONALES */

        else if (
            block.type === "if_block" ||
            block.type === "if_else_block"
        ) {

            result += generateConditionBlock(block);

        }

        /* CICLOS */

        else if (
            block.type === "while_block" ||
            block.type === "for_block"
        ) {

            result += generateLoopBlock(block);

        }

        /* FUNCIONES */

        else if (
            block.type === "call_function" ||
            block.type === "return_block"
        ) {

            result += generateFunctionBlock(block);

        }
        /* ARREGLOS */
        else if (


            block.type === "array_create" ||
            block.type === "array_set"


        ) {


            result +=
                generateArrayBlock(block);


        }
        /* SWITCH */

        else if (


            block.type === "switch_block" ||
            block.type === "case_block" ||
            block.type === "default_block"


        ) {


            result +=
                generateSwitchBlock(block);


        }
        else if (

            block.type === "function_parameter" ||
            block.type === "function_call_args"

        ) {

            result +=
                generateFunctionParameterBlock(block);

        }



        block = block.getNextBlock();


    }


    return result;


}
