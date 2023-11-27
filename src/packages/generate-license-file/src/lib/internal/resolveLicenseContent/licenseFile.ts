import { glob } from "glob";
import { relative } from "path";
import { Resolution } from "./index";
import logger from "../../utils/console.utils";
import { readFile } from "../../utils/file.utils";
import { extname } from "path";

// This file specifically handles cases where we're able to find
// a license file on disk that is a part of the package but it's
// not referenced in the package.json file.

// A 'best guess' for file extensions that are not license files
// but that may have the same name as a license file
export const extensionDenyList = [".js", ".ts", ".sh", ".ps1"];

export const licenseFile: Resolution = async inputs => {
  const { directory, packageJson } = inputs;

  const licenseFiles = await glob("{license,licence,copying,notice}{,-*,.*}", {
    nocase: true,
    nodir: true,
    absolute: true,
    cwd: directory,
    maxDepth: 1,
  });

  const filteredLicenseFiles = licenseFiles.filter(
    file => !extensionDenyList.includes(extname(file)),
  );

  if (filteredLicenseFiles.length === 0) {
    return null;
  }

  if (filteredLicenseFiles.length > 1) {
    const relativeLicenseFiles = filteredLicenseFiles.map(
      file => ` - ./${relative(directory, file)}`,
    );

    const warningLines = [
      `Found multiple license files for ${packageJson.name}@${packageJson.version}:`,
      ...relativeLicenseFiles,
      "We suggest you determine which file you wish to use and replace the license content",
      `for ${packageJson.name}@${packageJson.version} using a generate-license-file config file.`,
      "See: https://generate-license-file.js.org/docs/cli/config-file for more information.",
      "", // Empty line for spacing
    ];

    logger.warn(warningLines.join("\n"));
  }

  return await readFile(filteredLicenseFiles[0], { encoding: "utf-8" });
};
