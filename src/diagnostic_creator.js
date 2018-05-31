const vscode = require('vscode');
const DockerfileValidatorSeverity = require('./dockerfile_validator_severity').DockerfileValidatorSeverity;

class DiagnosticsCreator{
    static CreateDiagnostics(dockerfile, dockerfileValidation){
        
        var result = [];

        if(dockerfileValidation.error){
            result = result.concat(this.CreateDiagnosticsForSeverity(dockerfile, dockerfileValidation.error, DockerfileValidatorSeverity.Error));
        }
        
        if(dockerfileValidation.warn){
            result = result.concat(this.CreateDiagnosticsForSeverity(dockerfile, dockerfileValidation.warn, DockerfileValidatorSeverity.Warning));
        }
        
        if(dockerfileValidation.info){
            result = result.concat(this.CreateDiagnosticsForSeverity(dockerfile, dockerfileValidation.info, DockerfileValidatorSeverity.Information));
        }

        return result;
    }

    static CreateDiagnosticsForSeverity(dockerfile, validation, severity){
        var result = [];
        validation.data.forEach(validationLine => {
            var range = (validationLine.line||-1)===-1? new vscode.Range(dockerfile.lineCount,0,dockerfile.lineCount,5): dockerfile.lineAt(validationLine.line-1).range;
            var diagnostic = new vscode.Diagnostic(range,"[dockerfile-validator] " + validationLine.message + ((validationLine.lineContent||"") === "" ? "" : ": \"" + validationLine.lineContent + "\"") + "\n\t" + (Array.isArray(validationLine.reference_url)?validationLine.reference_url.join(""):validationLine.reference_url), this.DockerfileSeverityToDiagnosticsSeverity(severity));
            result.push(diagnostic);
        });
        return result;
    }

    static DockerfileSeverityToDiagnosticsSeverity(severity){
        var result;

        switch(severity){
            case DockerfileValidatorSeverity.Error:
                result = vscode.DiagnosticSeverity.Error;
                break;
            case DockerfileValidatorSeverity.Warning:
                result = vscode.DiagnosticSeverity.Warning;
                break;
            case DockerfileValidatorSeverity.Information:
                result = vscode.DiagnosticSeverity.Information;
                break;
            default:
                throw new Error(`Invalid Dockerfile Validator severity: '${severity}'`);
        }

        return result;
    }
}

module.exports = {
    DiagnosticsCreator
};