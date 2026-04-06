import { doesFileExist, readFile } from "../../utils/file.utils.mjs";

//#region src/lib/internal/resolveLicenseContent/replacementFile.ts
const replacementFile = async (location) => {
	if (!await doesFileExist(location)) return null;
	return readFile(location, { encoding: "utf-8" });
};

//#endregion
export { replacementFile };