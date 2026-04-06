import { fetchString } from "../../utils/http.utils.mjs";

//#region src/lib/internal/resolveLicenseContent/replacementHttp.ts
const replacementHttp = async (location) => {
	if (!location.startsWith("http") && !location.startsWith("www")) return null;
	return fetchString(location);
};

//#endregion
export { replacementHttp };