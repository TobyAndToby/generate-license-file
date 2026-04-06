import { exec } from "child_process";
import { promisify } from "util";

//#region src/lib/utils/exec.utils.ts
// istanbul ignore file
const execAsync = promisify(exec);

//#endregion
export { execAsync };