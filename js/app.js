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

    const btnEjecutar = document.getElementById('btnEjecutarCodigo');
    const terminal = document.getElementById('terminalSalida');
    
    if (btnEjecutar && !btnEjecutar.disabled) {
        btnEjecutar.disabled = true;
        btnEjecutar.style.opacity = "0.5";
        btnEjecutar.style.cursor = "not-allowed";
        
        if (terminal) {
            terminal.style.color = "#aaaaaa";
            terminal.innerText = "Vuelve a verificar el codigo";
        }
    }
}


// EJECUTAR C++ USANDO API
async function ejecutarCodigoCpp() {
    const btn = document.getElementById('btnEjecutarCodigo');
    
    if (btn.disabled) return; 

    const codigo = document.getElementById('generatedCode').innerText.trim();
    const terminal = document.getElementById('terminalSalida');

    terminal.style.color = "#ff9800"; 
    terminal.innerText = "Compilando y ejecutando en el servidor remoto...\nPor favor espera ⏳";
    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.style.cursor = "wait";

    try {
        // Hacemos la petición a la API de Wandbox
        const response = await fetch('https://wandbox.org/api/compile.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                compiler: 'gcc-head',
                code: codigo,
                save: false
            })
        });

        const data = await response.json();

        // data.status === "0" significa que el código compiló bien en el servidor
        if (data.status === "0") {
            terminal.style.color = "#00ff00";
            terminal.innerText = "Ejecución exitosa:\n\n" + (data.program_message || "[El programa se ejecutó correctamente pero no imprimió nada por consola]");
        } else {
            terminal.style.color = "#ff4c4c";
            terminal.innerText = "Error interno de Compilación C++:\n\n" + data.compiler_error;
        }

    } catch (error) {
        terminal.style.color = "#ff4c4c";
        terminal.innerText = "No se pudo conectar con el servidor de compilación.\n\nDetalles: " + error.message;
    } finally {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    }
}