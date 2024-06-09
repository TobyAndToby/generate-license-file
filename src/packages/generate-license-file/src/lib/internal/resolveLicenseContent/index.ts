import { PackageJson } from "../../utils/packageJson.utils";
import { packageJsonLicense } from "./packageJsonLicense";
import { licenseFile } from "./licenseFile";
import { spdxExpression } from "./spdxExpression";
import { replacementFile } from "./replacementFile";

export interface ResolutionInputs {
  directory: string;
  packageJson: PackageJson;
}

export type Resolution = (inputs: ResolutionInputs) => Promise<string | null>;
const resolutions: Resolution[] = [packageJsonLicense, licenseFile, spdxExpression];

export type ReplacementResolution = (location: string) => Promise<string | null>;
const replacementResolutions: ReplacementResolution[] = [replacementFile];

export const resolveLicenseContent = async (
  directory: string,
  packageJson: PackageJson,
  replacements: Record<string, string>,
): Promise<string | null> => {
  const replacementPath =
    replacements[`${packageJson.name}@${packageJson.version}`] ||
    replacements[`${packageJson.name}`];

  if (replacementPath) {
    return tryReplacementResolutions(replacementPath);
  }

  const resolutionInputs: ResolutionInputs = { directory, packageJson };
  return tryResolutions(resolutionInputs);
};

const tryReplacementResolutions = async (replacementPath: string) => {
  for (const resolution of replacementResolutions) {
    const result = await resolution(replacementPath);

    if (result) {
      return result;
    }
  }

  return null;
};

const tryResolutions = async (inputs: ResolutionInputs) => {
  for (const resolution of resolutions) {
    const result = await resolution(inputs);

    if (result) {
      return result;
    }
  }

  return null;
};
