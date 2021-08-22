import * as fs from "fs";
import { promisify } from "util";

const statAsync = promisify(fs.stat);
export const readFileAsync = promisify(fs.readFile);
export const writeFileAsync = promisify(fs.writeFile);

const UTF8 = "utf-8";

export async function doesFileExist(path: string): Promise<boolean> {
  try {
    const stats: fs.Stats = await statAsync(path);
    return stats.isFile();
  } catch {
    return false;
  }
}

export async function doesFolderExist(path: string): Promise<boolean> {
  try {
    const stats: fs.Stats = await statAsync(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

export function createWriteStream(outputPath: string) {
  return fs.createWriteStream(outputPath, {
    encoding: UTF8,
    flags: "w+"
  });
}
