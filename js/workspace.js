let workspace = null;

function initializeWorkspace() {

workspace = Blockly.inject("blocklyDiv", {

    toolbox: toolbox,

    trashcan: true,

    scrollbars: true,

    zoom: {

        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2

    },

    grid: {

        spacing: 20,
        length: 3,
        colour: "#cccccc",
        snap: true

    }

});

workspace.addChangeListener(onWorkspaceChange);

console.log("Workspace inicializado");


}

function onWorkspaceChange(event) {

if (!workspace) {
    return;
}

try {

    if (typeof registerVariables === "function") {

        registerVariables();

    }

    updateCppCode();

} catch (error) {

    console.error("Error actualizando código:", error);

}


}
