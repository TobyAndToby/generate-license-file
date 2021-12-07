import * as fs from "fs";
import { promisify } from "util";

const statAsync = promisify(fs.stat);
export const readFileAsync = promisify(fs.readFile);
export const writeFileAsync = promisify(fs.writeFile);

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
