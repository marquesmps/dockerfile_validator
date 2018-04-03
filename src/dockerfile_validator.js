const DockerFileValidator = require('dockerfile_lint');
const vscode = require('vscode');

class DockerfileValidator extends vscode.Disposable {

    constructor(window, subscriptions){
        super(() => this.dispose());

        this.window = window;
        this.window.onDidChangeTextEditorSelection(this.event,this, subscriptions);
		vscode.workspace.onDidOpenTextDocument(this.event, this, subscriptions);
        this.diagnosticsCollection = vscode.languages.createDiagnosticCollection();
    }

    event(){
        if(this.window.activeTextEditor.document.languageId === "dockerfile")
        {
            var dockerfile = this.window.activeTextEditor.document;
            var dockerfileContents = dockerfile.getText().replace(/\r\n/g, "\n");
            var validation = this.validate(dockerfileContents);
            var diagnostics = [] 
            
            validation.error.data.forEach(error => {
                var range = (error.line||-1)===-1? new vscode.Range(dockerfile.lineCount,0,dockerfile.lineCount,5) : dockerfile.lineAt(error.line-1).range;
                var diagnostic = new vscode.Diagnostic(range,"[dockerfile-validator] " + error.message + (error.lineContent === "" ? "" : ": \"" + error.lineContent + "\"") + "\n\t" + (Array.isArray(error.reference_url)?error.reference_url.join(""):error.reference_url), vscode.DiagnosticSeverity.Error);
                diagnostics.push(diagnostic);
            });
            
            validation.info.data.forEach(info => {
                var range = (info.line||-1)===-1? new vscode.Range(dockerfile.lineCount,0,dockerfile.lineCount,5): dockerfile.lineAt(info.line-1).range;
                var diagnostic = new vscode.Diagnostic(range,"[dockerfile-validator] " + info.message + (info.lineContent === "" ? "" : ": \"" + info.lineContent + "\"") + "\n\t" + (Array.isArray(info.reference_url)?info.reference_url.join(""):info.reference_url), vscode.DiagnosticSeverity.Information);
                diagnostics.push(diagnostic);
            });

            this.diagnosticsCollection.set(dockerfile.uri, diagnostics);
        }
    }

    validate(dockerfileContents){
        var validator = new DockerFileValidator();
        var result = validator.validate(dockerfileContents);
        return result;
    }

    dispose(){
		this.diagnosticCollection.clear();
		this.diagnosticCollection.dispose();
    }
}

module.exports = {
    DockerfileValidator
};