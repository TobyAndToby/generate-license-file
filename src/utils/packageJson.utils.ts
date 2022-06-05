import { doesFileExist, readFile } from "./file.utils";

export interface PackageJson {
  name?: string;
  version?: string;
}

export const readPackageJson = async (pathToPackageJson: string): Promise<PackageJson> => {
  const doesPackageJsonExist = await doesFileExist(pathToPackageJson);
  if (!doesPackageJsonExist) {
    throw new Error(`Cannot find the file: '${pathToPackageJson}'`);
  }

  const packageJsonAsString: string = await readFile(pathToPackageJson);

  const packageJson: PackageJson = JSON.parse(packageJsonAsString);
  return packageJson;
};
