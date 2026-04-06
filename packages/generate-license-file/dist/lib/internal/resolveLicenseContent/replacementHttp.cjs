const require_http_utils = require('../../utils/http.utils.cjs');

//#region src/lib/internal/resolveLicenseContent/replacementHttp.ts
const replacementHttp = async (location) => {
	if (!location.startsWith("http") && !location.startsWith("www")) return null;
	return require_http_utils.fetchString(location);
};

//#endregion
exports.replacementHttp = replacementHttp;