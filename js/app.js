window.addEventListener("load", () => {


initializeWorkspace();

updateCppCode();


});

function updateCppCode() {


const codePanel =
    document.getElementById("generatedCode");

if (!codePanel) {

    console.error(
        "No existe el elemento generatedCode"
    );

    return;
}

try {

    const code =
        buildCppCode();

    codePanel.textContent =
        code;

} catch (error) {

    console.error(
        "Error generando código:",
        error
    );

    codePanel.textContent =
        "// Error generando código\n\n" +
        error.message;
}


}
