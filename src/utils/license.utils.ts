/* istanbul ignore file */
import { init } from "license-checker";
import { promisify } from "util";

export const getProject = promisify(init);
export { ModuleInfo as Dependency, ModuleInfos as Project } from "license-checker";
