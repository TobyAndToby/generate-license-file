import { extname, relative } from "node:path";
import { glob } from "glob";
import logger from "../../utils/console.utils";
import { readFile } from "../../utils/file.utils";
import type { Resolution } from "./index";

// This file specifically handles cases where we're able to find
// a license file on disk that is a part of the package but it's
// not referenced in the package.json file.

// A 'best guess' for file extensions that are not license files
// but that may have the same name as a license file
export const extensionDenyList = [".js", ".ts", ".sh", ".ps1"];

export const licenseFile: Resolution = async inputs => {
  const { directory, packageJson } = inputs;

  const licenseFiles = await glob("{license,licence,copying}{,-*,.*}", {
    nocase: true,
    nodir: true,
    absolute: true,
    cwd: directory,
    maxDepth: 1,
  });

  // glob({ nocase: true }) returns matches using the pattern's case on
  // case-insensitive filesystems (e.g. "license" on macOS) but the on-disk
  // case elsewhere (e.g. "LICENSE" on Linux), and in filesystem order either
  // way. Sort case-insensitively (locale-independently, for determinism) so
  // the chosen file and the warning are stable across platforms; the base
  // name (e.g. "license") then sorts ahead of decorated variants
  // (e.g. "license-3rdparty.csv"), which is usually the real license.
  const filteredLicenseFiles = licenseFiles
    .filter(file => !extensionDenyList.includes(extname(file)))
    .sort((a, b) => {
      const lowerA = a.toLowerCase();
      const lowerB = b.toLowerCase();
      return lowerA < lowerB ? -1 : lowerA > lowerB ? 1 : 0;
    });

  if (filteredLicenseFiles.length === 0) {
    return null;
  }

  if (filteredLicenseFiles.length > 1) {
    const relativeLicenseFiles = filteredLicenseFiles.map(file => ` - ./${relative(directory, file)}`);

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
