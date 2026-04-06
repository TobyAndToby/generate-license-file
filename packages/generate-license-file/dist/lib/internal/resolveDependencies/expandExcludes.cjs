
//#region src/lib/internal/resolveDependencies/expandExcludes.ts
var RegexExclude = class {
	regex;
	constructor(regexPattern, flags) {
		this.regex = new RegExp(regexPattern, flags);
	}
	match(packageJson) {
		return this.regex.test(packageJson.identifier);
	}
};
var StringExclude = class {
	pattern;
	constructor(pattern) {
		this.pattern = pattern;
	}
	match(packageJson) {
		return this.pattern === packageJson.name || this.pattern === packageJson.identifier;
	}
};
const tryParseARegexString = /^\/(.+)\/([gimsuy]*)$/;
const isRegexPattern = (input) => {
	const match = input.match(tryParseARegexString);
	return match ? [match[1], match[2]] : false;
};
const expandExcludes = (patterns) => {
	if (!patterns) return [];
	return patterns.map((pattern) => {
		const regexMatch = isRegexPattern(pattern);
		if (regexMatch) {
			const [regexPattern, flags] = regexMatch;
			return new RegexExclude(regexPattern, flags);
		} else return new StringExclude(pattern);
	});
};

//#endregion
exports.expandExcludes = expandExcludes;