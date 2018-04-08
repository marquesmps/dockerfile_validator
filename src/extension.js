const vscode = require('vscode');
const dockerfile_validator = require("./dockerfile_validator")

function activate(context) {
    console.log('dockerfile-validator has been activated.');

    var dockerfileValidator = new dockerfile_validator.DockerfileValidator(vscode.window, vscode.workspace, context.subscriptions);

    context.subscriptions.push(dockerfileValidator);
}
exports.activate = activate;


function deactivate() {
}
exports.deactivate = deactivate;