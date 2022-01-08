import { exec } from "child_process";
import { readFile, rm, writeFile } from "fs";
import path, { join } from "path";
import { promisify } from "util";

const rmAsync = promisify(rm);
const execAsync = promisify(exec);
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

export function getProjectDirectoryUnderTest(
  specFileDirectory: string,
  packageJson: string
): string {
  const fullPath = path.join(specFileDirectory, packageJson);
  return path.dirname(fullPath);
}

export async function installAndRun(specFileDirectory: string, cmd: string): Promise<void> {
  await execAsync("npm ci", { cwd: specFileDirectory });
  await execAsync(cmd, { cwd: specFileDirectory });
}

export async function assertFile(directoryUnderTest: string, fileName: string): Promise<void> {
  const expected = await readFileAsync(fileName, path.join(directoryUnderTest, "expected-results"));
  const actual = await readFileAsync(fileName, directoryUnderTest);

  expect(actual).toBe(expected);
}

async function readFileAsync(filePath: string, cwd: string): Promise<string> {
  const fullPath = join(cwd, filePath);
  return await readFilePromisify(fullPath, "utf-8");
}
