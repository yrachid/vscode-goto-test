import path = require("path");
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "go-to-test.helloWorld",
    async () => {
      const activeEditor = vscode.window.activeTextEditor;

      if (!activeEditor) {
        vscode.window.setStatusBarMessage("go-to-test: No files open", 3000);
        return;
      }

      const testDocument = await testOf(activeEditor.document);

      vscode.window.showTextDocument(testDocument, vscode.ViewColumn.Beside);
    }
  );

  context.subscriptions.push(disposable);
}

async function testOf(
  currentFile: vscode.TextDocument
): Promise<vscode.TextDocument> {
  const dirName: string = path.dirname(currentFile.uri.path);
  const fileName: string = path.basename(currentFile.uri.path);

  const dot = fileName.lastIndexOf(".");

  const testName = `${fileName.substring(0, dot)}.spec.ts`;

  const testUri: vscode.Uri = vscode.Uri.file(path.join(dirName, testName));

  return await vscode.workspace.openTextDocument(testUri);
}

export function deactivate() {}
