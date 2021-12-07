import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export async function testOf(
  currentFile: vscode.TextDocument
): Promise<vscode.TextDocument | undefined> {
  const dirName: string = path.dirname(currentFile.uri.path);
  const fileName: string = path.basename(currentFile.uri.path);

  const lastDotIndex = fileName.lastIndexOf(".");

  const testName = `${fileName.substring(0, lastDotIndex)}.spec.ts`;

  const testUri: vscode.Uri = vscode.Uri.file(path.join(dirName, testName));

  if (!fs.existsSync(testUri.path)) {
    return undefined;
  }

  return await vscode.workspace.openTextDocument(testUri);
}
