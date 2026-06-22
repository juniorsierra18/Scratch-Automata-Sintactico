function generateIOBlock(block){

    switch(block.type){

        case "cout_block":

            return `
    cout << "${block.getFieldValue("TEXT")}"
         << endl;
`;

        case "cout_variable":

            return `
    cout << ${block.getFieldValue("VAR_NAME")}
         << endl;
`;

        case "cin_block":

            return `
    cin >> ${block.getFieldValue("VAR_NAME")};
`;

    }

    return "";
}