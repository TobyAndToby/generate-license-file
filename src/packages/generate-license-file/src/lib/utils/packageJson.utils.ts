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

class PackageJsonNotFoundError extends Error {}

export const readPackageJson = async (pathToPackageJson: string): Promise<PackageJson> => {
  const doesPackageJsonExist = await doesFileExist(pathToPackageJson);
  if (!doesPackageJsonExist) {
    throw new PackageJsonNotFoundError(`Cannot find the file: '${pathToPackageJson}'`);
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
    if (error instanceof PackageJsonNotFoundError) {
      return null;
    }

    throw error;
  }
};
