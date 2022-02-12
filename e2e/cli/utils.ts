import { exec } from "child_process";
import { readFile, rm, writeFile } from "fs";
import path, { join } from "path";
import { promisify } from "util";

const rmAsync = promisify(rm);
export const execAsync = promisify(exec);
const writeFileAsync = promisify(writeFile);
const readFilePromisify = promisify(readFile);

export async function deleteIfExists(filePath: string, cwd: string): Promise<void> {
  const fullPath = join(cwd, filePath);
  await rmAsync(fullPath, { force: true });
}

export async function ensureExists(filePath: string, cwd: string): Promise<void> {
  await deleteIfExists(filePath, cwd);
  const fullPath = join(cwd, filePath);
  await writeFileAsync(fullPath, "File exists!");
}

export function getAbsoluteTestPackageJson(packageJson: string): string {
  return path.join(__dirname, "../test-projects", packageJson);
}

export function getProjectDirectoryUnderTest(packageJson: string): string {
  const fullPath = getAbsoluteTestPackageJson(packageJson);
  return path.dirname(fullPath);
}

export async function assertFile(directoryUnderTest: string, fileName: string): Promise<void> {
  const expected = await readFileAsync(fileName, path.join(directoryUnderTest, "expected-results"));
  const actual = await readFileAsync(fileName, directoryUnderTest);

  expect(actual).toBe(expected);
}

export async function readFileAsync(filePath: string, cwd: string): Promise<string> {
  const fullPath = join(cwd, filePath);
  return await readFilePromisify(fullPath, "utf-8");
}
