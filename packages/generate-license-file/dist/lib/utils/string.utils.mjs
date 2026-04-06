//#region src/lib/utils/string.utils.ts
const lineEndingRegex = /\r\n|\r|\n/g;
const prepareContentForOutput = (content, eol) => {
	return content.replace(lineEndingRegex, eol).trim();
};

//#endregion
export { prepareContentForOutput };