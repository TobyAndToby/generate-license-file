const require_string_utils = require('../utils/string.utils.cjs');

//#region src/lib/models/license.ts
const BULLET = " - ";
const PREFIX = "The following npm package may be included in this product:";
const PREFIX_PLURAL = "The following npm packages may be included in this product:";
const MIDFIX = "This package contains the following license:";
const MIDFIX_PLURAL = "These packages each contain the following license:";
const NOTICES_PREFIX = "With the following notices:";
var License = class {
	content;
	notices;
	dependencies;
	constructor(content, notices, dependencies) {
		this.content = content;
		this.notices = notices;
		this.dependencies = dependencies;
	}
	format(lineEnding) {
		let formattedText = this.prefix(lineEnding) + this.formatDependencies(lineEnding) + this.midfix(lineEnding) + require_string_utils.prepareContentForOutput(this.content.trim(), lineEnding);
		if (this.notices.length > 0) {
			const noticeContent = this.notices.map((notice) => notice.trim()).join(lineEnding);
			formattedText += this.noticesPrefix(lineEnding) + require_string_utils.prepareContentForOutput(noticeContent, lineEnding);
		}
		return formattedText;
	}
	prefix(EOL) {
		if (this.dependencies.length === 1) return PREFIX + EOL + EOL;
		return PREFIX_PLURAL + EOL + EOL;
	}
	noticesPrefix(EOL) {
		return EOL + EOL + NOTICES_PREFIX + EOL + EOL;
	}
	formatDependencies(EOL) {
		return this.dependencies.sort((a, b) => a.localeCompare(b)).map((dependency) => {
			return BULLET + dependency + EOL;
		}).join("");
	}
	midfix(EOL) {
		if (this.dependencies.length === 1) return EOL + MIDFIX + EOL + EOL;
		return EOL + MIDFIX_PLURAL + EOL + EOL;
	}
};

//#endregion
exports.License = License;