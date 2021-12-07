import * as fs from "fs";
import * as path from "path";

type CodeDocument = {
  uri: {
    path: string;
  };
  languageId: string;
};

type TestFilePath = string;

export async function testOf(
  currentFile: CodeDocument
): Promise<TestFilePath | undefined> {
  const dirName: string = path.dirname(currentFile.uri.path);
  const fileName: string = path.basename(currentFile.uri.path);

  const lastDotIndex = fileName.lastIndexOf(".");

  const testName = `${fileName.substring(0, lastDotIndex)}.spec.ts`;

  const testFilePath = path.join(dirName, testName);

  return fs.existsSync(testFilePath) ? testFilePath : undefined;
}
