import * as vscode from "vscode";
import { testOf, fileName } from "./get-test-file";

export function activate(context: vscode.ExtensionContext) {
  const openTestFile = vscode.commands.registerCommand(
    "go-to-test.openTestFile",
    openFileCommand(vscode.ViewColumn.One)
  );

  const openTestFileBeside = vscode.commands.registerCommand(
    "go-to-test.openTestFileBeside",
    openFileCommand(vscode.ViewColumn.Beside)
  );

  context.subscriptions.push(openTestFile);
  context.subscriptions.push(openTestFileBeside);
}

const openFileCommand = (placement: vscode.ViewColumn) => async () => {
  const activeEditor = vscode.window.activeTextEditor;

  if (!activeEditor) {
    vscode.window.setStatusBarMessage("go-to-test: No files open", 3000);
    return;
  }

  const name = fileName(activeEditor.document);

  const matchingFiles = await vscode.workspace.findFiles(`**/*${name}.spec.ts`);

  console.log(">>>>>>>>>>", name);
  console.log(">>>>>>>>>>", matchingFiles);

  const testPath = await testOf(activeEditor.document);

  if (!testPath) {
    vscode.window.setStatusBarMessage("go-to-test: No test file found", 3000);
    return;
  }

  const testDocument = await vscode.workspace.openTextDocument(
    vscode.Uri.file(testPath)
  );

  vscode.window.showTextDocument(testDocument, placement);
};

export function deactivate() {}
