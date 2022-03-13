import * as fs from "fs";
import { dirname } from "path";
import { promisify } from "util";

const fsStatAsync = promisify(fs.stat);
const fsMkDir = promisify(fs.mkdir);
const fsWriteFileAsync = promisify(fs.writeFile);
export const readFileAsync = promisify(fs.readFile);

const UTF8 = "utf-8";

export async function doesFileExist(path: string): Promise<boolean> {
  try {
    const stats: fs.Stats = await fsStatAsync(path);
    return stats.isFile();
  } catch {
    return false;
  }
}

export async function doesFolderExist(path: string): Promise<boolean> {
  try {
    const stats: fs.Stats = await fsStatAsync(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

export async function writeFileAsync(filePath: string, content: string) {
  const directory = dirname(filePath);

  const directoryExists = await doesFolderExist(directory);

  if (!directoryExists) {
    await fsMkDir(directory, { recursive: true });
  }

  return await fsWriteFileAsync(filePath, content, { encoding: UTF8 });
}
