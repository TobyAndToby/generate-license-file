import { dirname, join } from "path/posix";
import { doesFolderExist } from "./file.utils";

export const resolveNodeModulesPath = async (startPath: string): Promise<string> => {
  let currentPath = startPath;
  let searching = true;

  while (searching) {
    const nodeModulesPath = join(currentPath, "node_modules");

    if (await doesFolderExist(nodeModulesPath)) {
      return nodeModulesPath;
    }

    const parentPath = dirname(currentPath);

    if (parentPath === currentPath) {
      searching = false;
    } else {
      currentPath = parentPath;
    }
  }

  throw new Error(`Could not find node_modules directory starting from ${startPath}`);
};
