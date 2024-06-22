import { doesFileExist, readFile } from "../../utils/file.utils";
import logger from "../../utils/console.utils";
import { join } from "path";
import { Resolution } from "./index";
import { PackageJson, PackageJsonLicense } from "../../utils/packageJson.utils";

// This file specifically handles cases where the package.json links
// to a license file that is on disk and is a part of the package.
//
// If it instead finds a URL to a license file, it will return that URL as-is.

export const packageJsonLicense: Resolution = async inputs => {
  const { packageJson, directory } = inputs;
  const { license, licenses } = packageJson;

  if (typeof license === "string") {
    return parseStringLicense(license, directory);
  }

  if (Array.isArray(license)) {
    return parseArrayLicense(license, packageJson);
  }

  if (typeof license === "object") {
    return parseObjectLicense(license);
  }

  if (Array.isArray(licenses)) {
    return parseArrayLicense(licenses, packageJson);
  }

  return null;
};

const parseStringLicense = async (spdxExpression: string, directory: string) => {
  if (!spdxExpression) {
    return null;
  }

  const lowerCaseExpression = spdxExpression.toLowerCase();

  if (lowerCaseExpression.startsWith("http") || lowerCaseExpression.startsWith("www")) {
    return spdxExpression;
  }

  if (!lowerCaseExpression.startsWith("see license in ")) {
    return null;
  }

  const licenseFilePath = sanitise(spdxExpression.substring(15));

  if (licenseFilePath.startsWith("http") || licenseFilePath.startsWith("www")) {
    return spdxExpression;
  }

  return await readLicenseFromDisk(directory, licenseFilePath);
};

// Removes characters that we've witnessed people use in license file paths
const sanitise = (str: string) => str.replace(/['"<>]/g, "");

const readLicenseFromDisk = async (dir: string, path: string): Promise<string | null> => {
  const absolutePath = join(dir, path);

  const fileExists = await doesFileExist(absolutePath);
  if (!fileExists) {
    logger.warn(`Could not find license file '${absolutePath}'`);
    return null;
  }

  try {
    return await readFile(absolutePath, { encoding: "utf-8" });
  } catch (e) {
    logger.warn(`Could not read license file '${absolutePath}'`);
    return null;
  }
};

const parseArrayLicense = (license: PackageJsonLicense[], packageJson: PackageJson) => {
  if (license.length === 0) {
    return null;
  }

  if (license.length === 1) {
    return parseObjectLicense(license[0]);
  }

  const warningLines = [
    `The license key for ${packageJson.name}@${packageJson.version} contains multiple licenses`,
    "We suggest you determine which license applies to your project and replace the license content",
    `for ${packageJson.name}@${packageJson.version} using a generate-license-file config file.`,
    "See: https://generate-license-file.js.org/docs/cli/config-file for more information.",
    "", // Empty line for spacing
  ];

  logger.warn(warningLines.join("\n"));

  return parseObjectLicense(license[0]);
};

const parseObjectLicense = (license: PackageJsonLicense) => {
  if (!license.url) {
    return null;
  }

  return license.url;
};
