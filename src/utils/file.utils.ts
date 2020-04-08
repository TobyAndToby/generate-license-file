import * as fs from "fs";
import { promisify } from "util";

const statAsync: (path: fs.PathLike) => Promise<fs.Stats> = promisify(fs.stat);
export const readFileAsync: (path: string, options: { encoding: string; flag?: string; }) => Promise<string> = promisify(fs.readFile);
export const writeFileAsync: (path: string, data: any, options?: fs.WriteFileOptions) => Promise<void> = promisify(fs.writeFile);

export async function doesFileExist(path: string): Promise<boolean> {
	try {
		const stats: fs.Stats = await statAsync(path);
		return stats.isFile();
	} catch {
		return false;
	}
}
