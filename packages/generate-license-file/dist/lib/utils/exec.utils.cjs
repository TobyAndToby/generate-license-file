const require_runtime = require('../../_virtual/_rolldown/runtime.cjs');
let child_process = require("child_process");
let util = require("util");

//#region src/lib/utils/exec.utils.ts
// istanbul ignore file
const execAsync = (0, util.promisify)(child_process.exec);

//#endregion
exports.execAsync = execAsync;