const vscode = require('vscode');
const dockerfile_validator = require("./dockerfile_validator")
const configs = require("./dockerfile_validator_configs")

function activate(context) {
    console.log('dockerfile-validator has been activated.');

    var dockerfileValidator = new dockerfile_validator.DockerfileValidator(vscode.window, vscode.workspace, configs.DockerfileValidatorConfigs.getRuleFilePath(), context.subscriptions);
    
    var dockerfileValidatorConfigs = new configs.DockerfileValidatorConfigs();
    dockerfileValidatorConfigs.subscribeToRuleFilePathConfigChange(dockerfileValidator);
    
    context.subscriptions.push(dockerfileValidator);
    context.subscriptions.push(dockerfileValidatorConfigs);
}
exports.activate = activate;



function deactivate() {
}
exports.deactivate = deactivate;