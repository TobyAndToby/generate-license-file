import { doesFileExist, readFile } from "./file.utils";

export interface PackageJson {
  name?: string;
  version?: string;
  license?: string | PackageJsonLicense | PackageJsonLicense[];
  licenses?: PackageJsonLicense[];
}

export interface PackageJsonLicense {
  type?: string;
  url?: string;
}

export const readPackageJson = async (pathToPackageJson: string): Promise<PackageJson> => {
  const doesPackageJsonExist = await doesFileExist(pathToPackageJson);
  if (!doesPackageJsonExist) {
    throw new Error(`Cannot find the file: '${pathToPackageJson}'`);
  }

  const packageJsonAsString: string = await readFile(pathToPackageJson, { encoding: "utf-8" });

  return JSON.parse(packageJsonAsString);
};

export const maybeReadPackageJson = async (
  pathToPackageJson: string,
): Promise<PackageJson | null> => {
  try {
    return await readPackageJson(pathToPackageJson);
  } catch (error) {
    return null;
  }
};
