import { join } from "path";
import { PackageJson, readPackageJson } from "../utils/packageJson.utils";
import { packageJsonLicense } from "./resolutions/packageJsonLicense";

export interface ResolutionInputs {
  directory: string;
  packageJson: PackageJson;
}

export type Resolution = (inputs: ResolutionInputs) => Promise<string | null>;

const resolutions: Resolution[] = [packageJsonLicense];

export const resolveLicenseContent = async (directory: string): Promise<string | null> => {
  const packageJson = await readPackageJson(join(directory, "package.json"));

  for (const resolution of resolutions) {
    const result = await resolution({ directory, packageJson });

    if (result) {
      return result;
    }
  }

  return null;
};
