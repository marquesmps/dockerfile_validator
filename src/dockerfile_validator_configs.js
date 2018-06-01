
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

class DockerfileValidatorConfigs extends vscode.Disposable { 
    
    subscribeToRuleFilePathConfigChange(subscriber){
        vscode.workspace.onDidChangeConfiguration(e => {
            if(e.affectsConfiguration("dockerfile-validator.rulefile.path")){
                subscriber.rulefilePath = DockerfileValidatorConfigs.getRuleFilePath();
            }
        });
    }
    
    static getRuleFilePath(){
        var config = vscode.workspace.getConfiguration('dockerfile-validator');
        var result = config.rulefile.path;
        if(!fs.existsSync(result)){
            var errorMessage = `Error loading rule file "${result}": File does not exist.\nUsing default rules instead.`;
            vscode.window.showWarningMessage(errorMessage);
            result = path.join(__dirname, "rule_files", 'default_rules.yaml');
        }
        return result;
    }
}

module.exports = {
    DockerfileValidatorConfigs
};