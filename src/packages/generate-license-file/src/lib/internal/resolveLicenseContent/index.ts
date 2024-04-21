import { PackageJson } from "../../utils/packageJson.utils";
import { packageJsonLicense } from "./packageJsonLicense";
import { licenseFile } from "./licenseFile";
import { spdxExpression } from "./spdxExpression";
import { readFile } from "../../utils/file.utils";
import { findMatchingSemver } from "../findMatchingSemver";

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
  // Reversing such that we can find the most specific replacement first.
  const replacementIds = Object.keys(replacements).sort().reverse();

  const foundReplacement = findMatchingSemver(replacementIds, packageJson);
  if (foundReplacement) {
    const replacementPath = replacements[foundReplacement];

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
