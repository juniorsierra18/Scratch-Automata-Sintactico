// Función manual para pausar y permitir la animación visual de los estados
const dormir = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 1. COMPONENTE LÉXICO (Autómata Finito para Tokenización)
 */
function lexer(codigo) {
    const tokens = [];
    const reglas = [
        { tipo: 'TIPO_DATO', regex: /^(int|float|double|char|void|string|bool)\b/ },
        { tipo: 'IF', regex: /^if\b/ },
        { tipo: 'ELSE', regex: /^else\b/ },
        { tipo: 'SWITCH', regex: /^switch\b/ },
        { tipo: 'CASE', regex: /^case\b/ },
        { tipo: 'DEFAULT', regex: /^default\b/ },
        { tipo: 'BREAK', regex: /^break\b/ },
        { tipo: 'WHILE', regex: /^while\b/ },
        { tipo: 'FOR', regex: /^for\b/ }, 
        { tipo: 'COUT', regex: /^cout\b/ },
        { tipo: 'ENDL', regex: /^endl\b/ },
        { tipo: 'TEXTO', regex: /^"[^\n"]*"/ },       
        { tipo: 'ERROR_COMILLAS', regex: /^"[^\n"]*/ }, 
        { tipo: 'NUMERO', regex: /^\d+/ },             
        { tipo: 'IDENTIFICADOR', regex: /^[a-zA-Z_]\w*/ }, 
        { tipo: 'INSERCION', regex: /^<</ }, 
        { tipo: 'OPERADOR_RELACIONAL', regex: /^(>=|<=|==|!=|>|<)/ },
        { tipo: 'OPERADOR_LOGICO', regex: /^(&&|\|\|)/ }, 
        { tipo: 'INCREMENTO_DECREMENTO', regex: /^(\+\+|--)/ }, 
        { tipo: 'OPERADOR_MATEMATICO', regex: /^(\+|-|\*|\/)/ }, 
        { tipo: 'ASIGNACION', regex: /^=/ },
        { tipo: 'DOS_PUNTOS', regex: /^:/ },
        { tipo: 'FIN_SENTENCIA', regex: /^;/ },
        { tipo: 'LLAVE_ABRE', regex: /^\{/ },
        { tipo: 'LLAVE_CIERRA', regex: /^\}/ },
        { tipo: 'PAREN_ABRE', regex: /^\(/ },
        { tipo: 'PAREN_CIERRA', regex: /^\)/ },
        { tipo: 'ESPACIO', regex: /^\s+/ }             
    ];

    let codigoRestante = codigo;
    while (codigoRestante.length > 0) {
        let matchEncontrado = false;
        for (let regla of reglas) {
            const match = regla.regex.exec(codigoRestante); 
            if (match) {
                if (regla.tipo !== 'ESPACIO') {
                    tokens.push({ tipo: regla.tipo, valor: match[0] });
                }
                codigoRestante = codigoRestante.substring(match[0].length);
                matchEncontrado = true;
                break; 
            }
        }
        if (!matchEncontrado) {
            tokens.push({ tipo: 'ERROR_LEXICO', valor: codigoRestante[0] });
            codigoRestante = codigoRestante.substring(1); 
        }
    }
    return tokens;
}

function actualizarConsola(mensaje) {
    const consola = document.getElementById('consola-traza');
    consola.innerHTML += `<div class="log-paso">${mensaje}</div>`;
    consola.scrollTop = consola.scrollHeight; 
}

function resaltarEstado(idEstado, esError = false) {
    document.querySelectorAll('.estado-caja').forEach(el => el.classList.remove('activo', 'error'));
    const caja = document.getElementById(`estado-${idEstado}`);
    if (caja) caja.classList.add(esError ? 'error' : 'activo');
}

function resaltarToken(index) {
    document.querySelectorAll('.token-badge').forEach(el => el.classList.remove('leyendo'));
    const badge = document.getElementById(`token-${index}`);
    if (badge) badge.classList.add('leyendo');
}

/**
 * 2. COMPONENTE SINTÁCTICO - SEMÁNTICO (Autómata de Pila)
 */
async function iniciarAnalisisAnimado() {
    const btn = document.getElementById('btnEjecutarAut');
    const divTokens = document.getElementById('contenedor-tokens');
    
    let codigoBruto = document.getElementById('generatedCode').innerText.trim();
    let codigo = codigoBruto;
    
    const matchMain = codigoBruto.match(/int\s+main\s*\(\s*\)\s*\{([\s\S]*)\}/);
    if (matchMain) {
        codigo = matchMain[1]; 
        codigo = codigo.replace(/return\s+0\s*;/g, '').trim(); 
    }
    
    if (codigo === "") {
        alert("El método main() está vacío. ¡Inserta bloques primero!");
        return;
    }

    btn.disabled = true;
    document.getElementById('consola-traza').innerHTML = '';
    divTokens.innerHTML = '';
    
    let estadoActual = 'ESPERANDO_SENTENCIA'; 
    let pilaLlaves = [];                      
    let pilaParentesis = [];                  
    let tablaSimbolos = new Set();            
    
    let memoriaTipoDato = ''; 
    let contextoBloque = 'NORMAL'; 
    let permiteElse = false;       
    let requiereInstruccionCase = false; 
    let ultimoTokenTipo = ''; 

    resaltarEstado(estadoActual);

    try {
        const tokens = lexer(codigo);
        
        tokens.forEach((token, index) => {
            let claseExtra = (token.tipo === 'ERROR_LEXICO' || token.tipo === 'ERROR_COMILLAS') ? 'error-token' : '';
            divTokens.innerHTML += `
                <div class="token-badge ${claseExtra}" id="token-${index}">
                    <span class="token-tipo">${token.tipo}</span>
                    <span class="token-valor">${token.valor.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>
                </div>
            `;
        });

        actualizarConsola("Iniciando ejecución del autómata de estados...");
        await dormir(600);

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            
            resaltarToken(i); 
            actualizarConsola(`➤ Evaluación: Estado [${estadoActual}] ➔ Token [${token.tipo}] ('${token.valor}')`);
            await dormir(300); 

            if (token.tipo === 'ERROR_COMILLAS') throw new Error(`Cadena de texto mal cerrada: <strong>${token.valor}</strong>`);
            if (token.tipo === 'ERROR_LEXICO') throw new Error(`Carácter no reconocido por el alfabeto: '${token.valor}'`);

            if (token.tipo === 'LLAVE_ABRE' && estadoActual === 'ESPERANDO_SENTENCIA') {
                pilaLlaves.push(contextoBloque); 
                actualizarConsola(`&nbsp;&nbsp;[Pila] Push de contexto: '${contextoBloque}'`);
                contextoBloque = 'NORMAL'; 
                requiereInstruccionCase = false; 
                ultimoTokenTipo = token.tipo;
                continue; 
            }
            if (token.tipo === 'LLAVE_CIERRA' && estadoActual === 'ESPERANDO_SENTENCIA') {
                if (requiereInstruccionCase) throw new Error(`Error estructural: No puedes dejar un 'case' o 'default' vacío antes de cerrar la llave.`);
                if (pilaLlaves.length === 0) throw new Error("Error sintáctico: Llave de cierre '}' no emparejada (Pila vacía).");
                let bloqueCerrado = pilaLlaves.pop(); 
                permiteElse = (bloqueCerrado === 'IF'); 
                actualizarConsola(`&nbsp;&nbsp;[Pila] Pop exitoso. Se cerró el scope de: '${bloqueCerrado}'`);
                ultimoTokenTipo = token.tipo;
                continue;
            }

            switch (estadoActual) {
                case 'ESPERANDO_SENTENCIA':
                    if (token.tipo === 'TIPO_DATO') { estadoActual = 'VAR_ESPERA_ID'; memoriaTipoDato = token.valor; permiteElse = false; requiereInstruccionCase = false; } 
                    else if (token.tipo === 'IDENTIFICADOR') { 
                        if (!tablaSimbolos.has(token.valor)) {
                            throw new Error(`<b>Error Semántico:</b> Intento de uso de la variable '<strong>${token.valor}</strong>', pero esta no existe en la Tabla de Símbolos.`);
                        }
                        estadoActual = 'VAR_ESPERA_IGUAL_O_FIN'; memoriaTipoDato = ''; permiteElse = false; requiereInstruccionCase = false; 
                    }
                    else if (token.tipo === 'IF') { estadoActual = 'IF_CONDICION'; pilaParentesis = []; permiteElse = false; requiereInstruccionCase = false; } 
                    else if (token.tipo === 'ELSE') {
                        if (!permiteElse) throw new Error(`Error sintáctico: Estructura 'else' huérfana (Falta un 'if' previo).`);
                        permiteElse = false; contextoBloque = 'ELSE'; resaltarEstado('ELSE_ACEPTADO'); requiereInstruccionCase = false; await dormir(400);
                    } 
                    else if (token.tipo === 'SWITCH') { estadoActual = 'SWITCH_CONDICION'; pilaParentesis = []; permiteElse = false; requiereInstruccionCase = false; }
                    else if (token.tipo === 'WHILE') { estadoActual = 'WHILE_CONDICION'; pilaParentesis = []; permiteElse = false; requiereInstruccionCase = false; }
                    else if (token.tipo === 'FOR') { estadoActual = 'FOR_CONDICION'; pilaParentesis = []; permiteElse = false; requiereInstruccionCase = false; }
                    else if (token.tipo === 'CASE') {
                        if (!pilaLlaves.includes('SWITCH')) throw new Error(`Error estructural: Sentencia 'case' declarada fuera de un bloque 'switch'.`);
                        if (requiereInstruccionCase) throw new Error(`Sintaxis inválida: El 'case' previo no tiene instrucciones.`);
                        estadoActual = 'CASE_VALOR'; permiteElse = false;
                    }
                    else if (token.tipo === 'DEFAULT') {
                        if (!pilaLlaves.includes('SWITCH')) throw new Error(`Error estructural: Sentencia 'default' declarada fuera de un bloque 'switch'.`);
                        if (requiereInstruccionCase) throw new Error(`Sintaxis inválida: El caso anterior está vacío.`);
                        estadoActual = 'ESPERA_DOS_PUNTOS'; permiteElse = false;
                    }
                    else if (token.tipo === 'BREAK') { estadoActual = 'VAR_ESPERA_FIN'; permiteElse = false; requiereInstruccionCase = false; }
                    else if (token.tipo === 'COUT') { estadoActual = 'COUT_ESPERA_INSERCION'; permiteElse = false; requiereInstruccionCase = false; } 
                    else { throw new Error(`Transición denegada: El token '${token.valor}' no inicia ninguna sentencia válida.`); }
                    break;

                case 'VAR_ESPERA_ID':
                    if (token.tipo === 'IDENTIFICADOR') {
                        tablaSimbolos.add(token.valor);
                        actualizarConsola(`&nbsp;&nbsp;<span style="color: #4caf50;">[Semántico] Exito: Nueva variable '${token.valor}' registrada en la memoria.</span>`);
                        estadoActual = 'VAR_ESPERA_IGUAL_O_FIN';
                    }
                    else throw new Error(`Error sintáctico: Se esperaba un IDENTIFICADOR para nombrar la variable.`); break;
                
                case 'VAR_ESPERA_IGUAL_O_FIN':
                    if (token.tipo === 'ASIGNACION') { estadoActual = 'VAR_ESPERA_VALOR'; pilaParentesis = []; } 
                    else if (token.tipo === 'FIN_SENTENCIA') estadoActual = 'ESPERANDO_SENTENCIA';
                    else throw new Error(`Error sintáctico: Se esperaba un operador '=' o un ';'.`); break;
                
                case 'VAR_ESPERA_VALOR':
                    if (token.tipo === 'PAREN_ABRE') {
                        pilaParentesis.push('('); 
                    }
                    else if (token.tipo === 'IDENTIFICADOR') {
                        if (!tablaSimbolos.has(token.valor)) {
                            throw new Error(`<b>Error Semántico:</b> No puedes operar con '<strong>${token.valor}</strong>' porque no ha sido declarada.`);
                        }
                        estadoActual = 'VAR_ESPERA_FIN';
                    }
                    else if (token.tipo === 'NUMERO' || token.tipo === 'TEXTO') { 
                        if (memoriaTipoDato === 'string' && token.tipo !== 'TEXTO') throw new Error(`Error de tipos: Tipo 'string' requiere un valor de TEXTO entre comillas.`);
                        estadoActual = 'VAR_ESPERA_FIN'; 
                    }
                    else throw new Error(`Error sintáctico: Valor de asignación no válido. Recibido '${token.valor}'`); 
                    break;
                    
                case 'VAR_ESPERA_FIN':
                    if (token.tipo === 'FIN_SENTENCIA') {
                        if (pilaParentesis.length > 0) throw new Error("Error sintáctico: Falta cerrar un paréntesis ')' en tu operación matemática.");
                        estadoActual = 'ESPERANDO_SENTENCIA'; 
                    }
                    else if (token.tipo === 'OPERADOR_MATEMATICO') {
                        estadoActual = 'VAR_ESPERA_VALOR'; 
                    }
                    else if (token.tipo === 'PAREN_CIERRA') {
                        if (pilaParentesis.length === 0) throw new Error("Error sintáctico: Paréntesis ')' de cierre sobrante o inesperado.");
                        pilaParentesis.pop(); 
                    }
                    else throw new Error(`Error estructural: Se esperaba un ';' para finalizar la línea o un operador matemático.`); 
                    break;

                case 'IF_CONDICION':
                    if (token.tipo === 'PAREN_ABRE') pilaParentesis.push('(');
                    else if (token.tipo === 'PAREN_CIERRA') {
                        if(pilaParentesis.length === 0) throw new Error("Paréntesis ')' de cierre inesperado.");
                        pilaParentesis.pop();
                        if (pilaParentesis.length === 0) { estadoActual = 'ESPERANDO_SENTENCIA'; contextoBloque = 'IF'; }
                    }
                    else if (token.tipo === 'IDENTIFICADOR') {
                        if (!tablaSimbolos.has(token.valor)) throw new Error(`<b>Error Semántico:</b> Variable '<strong>${token.valor}</strong>' usada en condición IF no ha sido declarada.`);
                    }
                    else if (!['NUMERO','OPERADOR_RELACIONAL','OPERADOR_MATEMATICO','OPERADOR_LOGICO'].includes(token.tipo)) { throw new Error(`Token ilegal dentro de la condición del IF.`); }
                    break;

                case 'WHILE_CONDICION':
                    if (token.tipo === 'PAREN_ABRE') pilaParentesis.push('(');
                    else if (token.tipo === 'PAREN_CIERRA') {
                        if(pilaParentesis.length === 0) throw new Error("Paréntesis ')' de cierre inesperado.");
                        pilaParentesis.pop();
                        if (pilaParentesis.length === 0) { estadoActual = 'ESPERANDO_SENTENCIA'; contextoBloque = 'WHILE'; }
                    }
                    else if (token.tipo === 'IDENTIFICADOR') {
                        if (!tablaSimbolos.has(token.valor)) throw new Error(`<b>Error Semántico:</b> Variable '<strong>${token.valor}</strong>' usada en el bucle WHILE no existe.`);
                    }
                    else if (!['NUMERO','OPERADOR_RELACIONAL','OPERADOR_MATEMATICO', 'OPERADOR_LOGICO'].includes(token.tipo)) { throw new Error(`Token ilegal dentro de la condición del WHILE.`); }
                    break;

                case 'FOR_CONDICION':
                    if (token.tipo === 'PAREN_ABRE') pilaParentesis.push('(');
                    else if (token.tipo === 'PAREN_CIERRA') {
                        if(pilaParentesis.length === 0) throw new Error("Paréntesis ')' de cierre inesperado en estructura FOR.");
                        pilaParentesis.pop();
                        if (pilaParentesis.length === 0) { estadoActual = 'ESPERANDO_SENTENCIA'; contextoBloque = 'FOR'; }
                    }
                    else if (token.tipo === 'IDENTIFICADOR') {
                        if (ultimoTokenTipo === 'TIPO_DATO') {
                            tablaSimbolos.add(token.valor); 
                            actualizarConsola(`&nbsp;&nbsp;<span style="color: #4caf50;">[Semántico] Variable local '${token.valor}' inicializada en el FOR.</span>`);
                        } else {
                            if (!tablaSimbolos.has(token.valor)) throw new Error(`<b>Error Semántico:</b> La variable iteradora '<strong>${token.valor}</strong>' no existe.`);
                        }
                    }
                    else if (!['TIPO_DATO', 'ASIGNACION', 'NUMERO', 'FIN_SENTENCIA', 'OPERADOR_RELACIONAL', 'OPERADOR_LOGICO', 'OPERADOR_MATEMATICO', 'INCREMENTO_DECREMENTO'].includes(token.tipo)) { 
                        throw new Error(`Sintaxis inválida en los parámetros del ciclo FOR: '${token.valor}'`); 
                    }
                    break;

                case 'SWITCH_CONDICION':
                    if (token.tipo === 'PAREN_ABRE') pilaParentesis.push('(');
                    else if (token.tipo === 'PAREN_CIERRA') {
                        if(pilaParentesis.length === 0) throw new Error("Paréntesis ')' de cierre inesperado.");
                        pilaParentesis.pop();
                        if (pilaParentesis.length === 0) { estadoActual = 'ESPERANDO_SENTENCIA'; contextoBloque = 'SWITCH'; }
                    }
                    else if (token.tipo === 'IDENTIFICADOR') {
                        if (!tablaSimbolos.has(token.valor)) throw new Error(`<b>Error Semántico:</b> La variable evaluada en el SWITCH ('<strong>${token.valor}</strong>') no existe.`);
                    }
                    else if (!['NUMERO','OPERADOR_MATEMATICO'].includes(token.tipo)) { throw new Error(`El 'switch' requiere una variable válida o expresión numérica.`); }
                    break;

                case 'CASE_VALOR':
                    if (token.tipo === 'IDENTIFICADOR') {
                        if (!tablaSimbolos.has(token.valor)) throw new Error(`<b>Error Semántico:</b> Constante '${token.valor}' en el case no declarada.`);
                    }
                    else if (!['NUMERO', 'TEXTO'].includes(token.tipo)) throw new Error(`Error sintáctico: El 'case' requiere un valor literal fijo.`); 
                    break;

                case 'ESPERA_DOS_PUNTOS':
                    if (token.tipo === 'DOS_PUNTOS') { estadoActual = 'ESPERANDO_SENTENCIA'; requiereInstruccionCase = true; } 
                    else throw new Error(`Sintaxis inválida: Falta colocar los dos puntos ':' correspondientes.`); break;

                case 'COUT_ESPERA_INSERCION':
                    if (token.tipo === 'INSERCION') estadoActual = 'COUT_ESPERA_VALOR'; else throw new Error(`Sintaxis inválida: Se esperaba el operador '<<'.`); break;
                
                case 'COUT_ESPERA_VALOR':
                    if (token.tipo === 'IDENTIFICADOR') {
                        if (!tablaSimbolos.has(token.valor)) throw new Error(`<b>Error Semántico:</b> Intento de imprimir la variable '<strong>${token.valor}</strong>' por consola, pero esta no existe.`);
                        estadoActual = 'COUT_ESPERA_MAS_O_FIN';
                    }
                    else if (['TEXTO','NUMERO','ENDL'].includes(token.tipo)) estadoActual = 'COUT_ESPERA_MAS_O_FIN';
                    else throw new Error(`Error de sintaxis: Falta el argumento o variable a imprimir.`); break;
                
                case 'COUT_ESPERA_MAS_O_FIN':
                    if (token.tipo === 'INSERCION') estadoActual = 'COUT_ESPERA_VALOR'; 
                    else if (token.tipo === 'OPERADOR_MATEMATICO') estadoActual = 'COUT_ESPERA_VALOR'; 
                    else if (token.tipo === 'FIN_SENTENCIA') estadoActual = 'ESPERANDO_SENTENCIA'; 
                    else throw new Error(`Sintaxis inválida: Falta encadenar con '<<' o cerrar con ';'.`); break;
            }

            if(!['IF_CONDICION', 'SWITCH_CONDICION', 'WHILE_CONDICION', 'FOR_CONDICION'].includes(estadoActual) && token.tipo !== 'ELSE') { 
                actualizarConsola(`&nbsp;&nbsp;Transición de Estado Exitosa ➔ [${estadoActual}]`); 
            }
            if(token.tipo !== 'ELSE') resaltarEstado(estadoActual);
            
            ultimoTokenTipo = token.tipo; 
            await dormir(600); 
        }

        if (estadoActual !== 'ESPERANDO_SENTENCIA') throw new Error("Error de Cierre: El código terminó abruptamente en una instrucción incompleta.");
        if (pilaParentesis.length > 0) throw new Error("Error Semántico/Sintáctico: Uno o más paréntesis quedaron abiertos.");
        if (pilaLlaves.length > 0) throw new Error("Error estructural: Falta cerrar un bloque de código con '}'.");

        document.querySelectorAll('.token-badge').forEach(el => el.classList.remove('leyendo'));
        actualizarConsola(`<div class="log-exito">CÓDIGO COMPLETAMENTE VÁLIDO<br>• Análisis Sintáctico: Correcto<br>• Análisis Semántico (Variables): Verificado</div>`);

        // ==========================================
        // NUEVO: ÉXITO - ENCENDER BOTÓN DE EJECUCIÓN
        // ==========================================
        const btnEjecutar = document.getElementById('btnEjecutarCodigo');
        const terminal = document.getElementById('terminalSalida');
        if (btnEjecutar && terminal) {
            btnEjecutar.disabled = false;
            btnEjecutar.style.opacity = "1";
            btnEjecutar.style.cursor = "pointer";
            terminal.style.color = "#aaaaaa";
            terminal.innerText = "Listo para ejecutar el código.";
        }

    } catch (error) {
        resaltarEstado(estadoActual, true); 
        actualizarConsola(`<div class="log-error">COMPILACIÓN RECHAZADA:<br>${error.message}<br><br>Autómata detenido en estado de falla.</div>`);
        
        // ==========================================
        // NUEVO: ERROR - APAGAR BOTÓN DE EJECUCIÓN
        // ==========================================
        const btnEjecutar = document.getElementById('btnEjecutarCodigo');
        const terminal = document.getElementById('terminalSalida');
        if (btnEjecutar && terminal) {
            btnEjecutar.disabled = true;
            btnEjecutar.style.opacity = "0.5";
            btnEjecutar.style.cursor = "not-allowed";
            terminal.style.color = "#ff4c4c";
            terminal.innerText = "Corrige los errores en el Autómata primero.";
        }

    } finally {
        btn.disabled = false; 
    }
}