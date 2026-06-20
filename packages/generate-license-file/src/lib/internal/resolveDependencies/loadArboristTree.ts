import { dirname } from "node:path";
import Arborist, { type Node } from "@npmcli/arborist";
import { resolveNodeModulesPath } from "../../utils/path.utils";

export const loadArboristTree = async (projectPath: string): Promise<Node> => {
  const nodeModulesPath = await resolveNodeModulesPath(projectPath);
  const dirContainingNodeModules = dirname(nodeModulesPath);

  const arborist = new Arborist({ path: dirContainingNodeModules });
  return arborist.loadActual();
};
