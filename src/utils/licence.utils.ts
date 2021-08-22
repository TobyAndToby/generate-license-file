import { init } from "license-checker";
import { promisify } from "util";

export const getProject = promisify(init);
export { ModuleInfos as Project } from "license-checker";
