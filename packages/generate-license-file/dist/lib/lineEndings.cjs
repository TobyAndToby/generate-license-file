const require_runtime = require('../_virtual/_rolldown/runtime.cjs');
let os = require("os");
os = require_runtime.__toESM(os);

//#region src/lib/lineEndings.ts
const lineEndings = ["crlf", "lf"];
const lineEndingsMap = {
	crlf: "\r\n",
	lf: "\n"
};
const lineEndingCharacters = Object.values(lineEndingsMap);
const isLineEnding = (input) => lineEndings.includes(input);
const getLineEndingCharacters = (input) => {
	if (input === void 0) return os.default.EOL;
	return lineEndingsMap[input];
};

//#endregion
exports.getLineEndingCharacters = getLineEndingCharacters;
exports.isLineEnding = isLineEnding;