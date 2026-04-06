import { resolveDependencies } from "./resolveDependencies/index.mjs";

//#region src/lib/internal/resolveLicenses.ts
const resolveLicenses = async (packageJsons, options) => {
	const licensesMap = /* @__PURE__ */ new Map();
	for (const packageJson of packageJsons) await resolveDependencies(packageJson, licensesMap, options);
	return Array.from(licensesMap.values());
};

//#endregion
export { resolveLicenses };