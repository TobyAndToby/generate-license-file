const require_runtime = require('../../../../_virtual/_rolldown/runtime.cjs');
let json5 = require("json5");
json5 = require_runtime.__toESM(json5);

//#region src/lib/cli/config/parsers/json5.ts
const json5Parse = (content) => json5.parse(content);

//#endregion
exports.json5Parse = json5Parse;