import os from "os";

//#region src/lib/lineEndings.ts
const lineEndings = ["crlf", "lf"];
const lineEndingsMap = {
	crlf: "\r\n",
	lf: "\n"
};
const lineEndingCharacters = Object.values(lineEndingsMap);
const isLineEnding = (input) => lineEndings.includes(input);
const getLineEndingCharacters = (input) => {
	if (input === void 0) return os.EOL;
	return lineEndingsMap[input];
};

//#endregion
export { getLineEndingCharacters, isLineEnding };