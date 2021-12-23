import { doesFileExist, readFileAsync } from "./file.utils";

export interface PackageJson {
  name?: string;
  version?: string;
}

export const readPackageJson = async (pathToPackageJson: string): Promise<PackageJson> => {
  const doesPackageJsonExist = await doesFileExist(pathToPackageJson);
  if (!doesPackageJsonExist) {
    throw new Error("Cannot find the package.json: " + pathToPackageJson);
  }

  const packageJsonAsString: string = await readFileAsync(pathToPackageJson, { encoding: "utf8" });

  const packageJson: PackageJson = JSON.parse(packageJsonAsString);
  return packageJson;
};
