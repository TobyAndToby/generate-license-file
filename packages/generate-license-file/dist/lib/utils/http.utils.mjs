//#region src/lib/utils/http.utils.ts
// istanbul ignore file
const fetchString = async (url) => {
	return (await fetch(url)).text();
};

//#endregion
export { fetchString };