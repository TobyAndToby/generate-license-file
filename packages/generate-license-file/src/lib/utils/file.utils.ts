import { Stats } from "fs";
import fs from "fs/promises";
import { dirname } from "path";

export { readFile } from "fs/promises";

const UTF8 = "utf-8";

export async function doesFileExist(path: string): Promise<boolean> {
  try {
    const stats: Stats = await fs.stat(path);
    return stats.isFile();
  } catch {
    return false;
  }
}

export async function doesFolderExist(path: string): Promise<boolean> {
  try {
    const stats: Stats = await fs.stat(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

export async function writeFileAsync(filePath: string, content: string) {
  const directory = dirname(filePath);

  const directoryExists = await doesFolderExist(directory);

  if (!directoryExists) {
    await fs.mkdir(directory, { recursive: true });
  }

  return await fs.writeFile(filePath, content, { encoding: UTF8 });
}
