
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const DockerFileValidator = require('dockerfile_lint');

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
        var validRuleFile =  DockerfileValidatorConfigs.validateRulefile(result, (errorMessage) =>{
            var errorMessage = `[dockerfile-validator]: Error loading rule file "${errorMessage}":.\nUsing default rules instead.`;
            vscode.window.showWarningMessage(errorMessage);
        })
        if(!validRuleFile){
            result = path.join(__dirname, "rule_files", 'default_rules.yaml');
        }
        return result;
    }

    static validateRulefile(ruleFilePath, errorCallback){
        var result = false;
        
        if(!fs.existsSync(ruleFilePath)){
            var errorMessage = `"${ruleFilePath}": File does not exist.`;
            errorCallback(errorMessage);
        }
        else{
            try {
                new DockerFileValidator(ruleFilePath);
                result = true;
            } catch (error) {
                errorCallback(error.message)
            }
        }

        return result;
    }
}

module.exports = {
    DockerfileValidatorConfigs
};