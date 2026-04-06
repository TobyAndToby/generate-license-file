const require_runtime = require('../../../_virtual/_rolldown/runtime.cjs');
let glob = require("glob");
let fs_promises = require("fs/promises");

//#region src/lib/internal/resolveNoticeContent/index.ts
const resolveNotices = async (directory) => {
	const noticeFiles = await (0, glob.glob)("notice{,-*,.*}", {
		nocase: true,
		nodir: true,
		absolute: true,
		cwd: directory,
		maxDepth: 1
	});
	if (noticeFiles.length === 0) return [];
	return await Promise.all(noticeFiles.map(async (f) => await (0, fs_promises.readFile)(f, { encoding: "utf-8" })));
};

//#endregion
exports.resolveNotices = resolveNotices;