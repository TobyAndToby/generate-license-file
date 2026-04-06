import { readFile } from "../../utils/file.utils.mjs";
import { glob } from "glob";

//#region src/lib/internal/resolveNoticeContent/index.ts
const resolveNotices = async (directory) => {
	const noticeFiles = await glob("notice{,-*,.*}", {
		nocase: true,
		nodir: true,
		absolute: true,
		cwd: directory,
		maxDepth: 1
	});
	if (noticeFiles.length === 0) return [];
	return await Promise.all(noticeFiles.map(async (f) => await readFile(f, { encoding: "utf-8" })));
};

//#endregion
export { resolveNotices };