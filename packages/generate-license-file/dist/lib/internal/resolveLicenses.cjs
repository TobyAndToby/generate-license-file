const require_index = require('./resolveDependencies/index.cjs');

//#region src/lib/internal/resolveLicenses.ts
const resolveLicenses = async (packageJsons, options) => {
	const licensesMap = /* @__PURE__ */ new Map();
	for (const packageJson of packageJsons) await require_index.resolveDependencies(packageJson, licensesMap, options);
	return Array.from(licensesMap.values());
};

//#endregion
exports.resolveLicenses = resolveLicenses;