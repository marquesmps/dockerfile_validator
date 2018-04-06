// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const dockerfile_validator = require("./dockerfile_validator")

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('dockerfile-validator has been activated.');

    var dockerfileValidator = new dockerfile_validator.DockerfileValidator(vscode.window, context.subscriptions);

    context.subscriptions.push(dockerfileValidator);
}
exports.activate = activate;


// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;