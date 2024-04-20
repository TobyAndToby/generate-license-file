import { PackageJson } from "../../utils/packageJson.utils";
import { packageJsonLicense } from "./packageJsonLicense";
import { licenseFile } from "./licenseFile";
import { spdxExpression } from "./spdxExpression";
import { readFile } from "../../utils/file.utils";

export interface ResolutionInputs {
  directory: string;
  packageJson: PackageJson;
}

export type Resolution = (inputs: ResolutionInputs) => Promise<string | null>;

const resolutions: Resolution[] = [packageJsonLicense, licenseFile, spdxExpression];

export const resolveLicenseContent = async (
  directory: string,
  packageJson: PackageJson,
  replacements: Record<string, string>,
): Promise<string | null> => {
  const replacementPath =
    replacements[`${packageJson.name}@${packageJson.version}`] ||
    replacements[`${packageJson.name}`];

  if (replacementPath) {
    return await readFile(replacementPath, { encoding: "utf-8" });
  }

  for (const resolution of resolutions) {
    const result = await resolution({ directory, packageJson });

    if (result) {
      return result;
    }
  }

  return null;
};
