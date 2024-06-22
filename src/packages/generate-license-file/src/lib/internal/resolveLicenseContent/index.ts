import { PackageJson } from "../../utils/packageJson.utils";
import { packageJsonLicense } from "./packageJsonLicense";
import { licenseFile } from "./licenseFile";
import { spdxExpression } from "./spdxExpression";
import { replacementFile } from "./replacementFile";
import { replacementHttp } from "./replacementHttp";

export interface ResolutionInputs {
  directory: string;
  packageJson: PackageJson;
}

export type Resolution = (inputs: ResolutionInputs) => Promise<string | null>;
const resolutions: Resolution[] = [packageJsonLicense, licenseFile, spdxExpression];

export type ReplacementResolution = (location: string) => Promise<string | null>;
const replacementResolutions: ReplacementResolution[] = [replacementHttp, replacementFile];

export const resolveLicenseContent = async (
  directory: string,
  packageJson: PackageJson,
  replacements: Record<string, string>,
): Promise<string> => {
  const replacementPath =
    replacements[`${packageJson.name}@${packageJson.version}`] ||
    replacements[`${packageJson.name}`];

  if (replacementPath) {
    return runReplacementResolutions(replacementPath, packageJson);
  }

  const resolutionInputs: ResolutionInputs = { directory, packageJson };
  return runResolutions(resolutionInputs, packageJson);
};

const runReplacementResolutions = async (replacementPath: string, packageJson: PackageJson) => {
  for (const resolution of replacementResolutions) {
    const result = await resolution(replacementPath);

    if (result) {
      return result;
    }
  }

  throw new Error(
    `Could not find replacement content at ${replacementPath} for ${packageJson.name}@${packageJson.version}`,
  );
};

const runResolutions = async (inputs: ResolutionInputs, packageJson: PackageJson) => {
  for (const resolution of resolutions) {
    const result = await resolution(inputs);

    if (result) {
      return result;
    }
  }

  throw new Error(`Could not find license content for ${packageJson.name}@${packageJson.version}`);
};
