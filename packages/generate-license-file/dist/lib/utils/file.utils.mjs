import { dirname } from "path";
import fs, { readFile } from "fs/promises";

//#region src/lib/utils/file.utils.ts
const UTF8 = "utf-8";
async function doesFileExist(path) {
	try {
		return (await fs.stat(path)).isFile();
	} catch {
		return false;
	}
}
async function doesFolderExist(path) {
	try {
		return (await fs.stat(path)).isDirectory();
	} catch {
		return false;
	}
}
async function writeFileAsync(filePath, content) {
	const directory = dirname(filePath);
	if (!await doesFolderExist(directory)) await fs.mkdir(directory, { recursive: true });
	return await fs.writeFile(filePath, content, { encoding: UTF8 });
}

//#endregion
export { doesFileExist, readFile, writeFileAsync };