const DockerFileValidator = require('dockerfile_lint');
const vscode = require('vscode');
const LanguageIds = require('./language_ids').LanguageIds;
const DiagnosticsCreator = require('./diagnostic_creator').DiagnosticsCreator;

class DockerfileValidator extends vscode.Disposable { 

    constructor(window, workspace, subscriptions){
        super(() => this.dispose());

        var disposables = [];
        this.window = window;
        this.diagnosticsCollection = vscode.languages.createDiagnosticCollection();
        disposables.push(this.window.onDidChangeTextEditorSelection(this.event,this, subscriptions));
        disposables.push(workspace.onDidOpenTextDocument(this.event, this, subscriptions));
        disposables.push(this.diagnosticsCollection);
        this.disposable = vscode.Disposable.from(disposables);
    }

    event(){
        if(this.window.activeTextEditor.document.languageId === LanguageIds.dockerfile)
        {
            var dockerfile = this.window.activeTextEditor.document;
            var dockerfileContents = dockerfile.getText().replace(/\r\n/g, "\n");
            var validation = this.validate(dockerfileContents);
            var diagnostics = DiagnosticsCreator.CreateDiagnostics(dockerfile, validation);
            this.diagnosticsCollection.set(dockerfile.uri, diagnostics);
        }
    }

    validate(dockerfileContents){
        var validator = new DockerFileValidator();
        var result = validator.validate(dockerfileContents);
        return result;
    }

    dispose(){
		this.diagnosticsCollection.clear();
		this.disposable.dispose();
    }
}

module.exports = {
    DockerfileValidator
};