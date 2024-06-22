import logger from "../../utils/console.utils";
import { PackageJson, PackageJsonLicense } from "../../utils/packageJson.utils";
import { Resolution } from "./index";

// This file specifically handles cases where the package.json contains an SPDX license expression.

export const spdxExpression: Resolution = async input => {
  const { packageJson } = input;

  const { license, licenses } = packageJson;

  if (typeof license === "string") {
    return handleStringLicense(license, packageJson);
  }

  if (Array.isArray(license)) {
    return handleArrayLicense(license, packageJson);
  }

  if (typeof license === "object") {
    return handleObjectLicense(license, packageJson);
  }

  if (Array.isArray(licenses)) {
    return handleArrayLicense(licenses, packageJson);
  }

  return null;
};

const handleArrayLicense = (licenses: PackageJsonLicense[], packageJson: PackageJson) => {
  if (licenses.length === 0) {
    return null;
  }

  if (licenses.length === 1) {
    return handleObjectLicense(licenses[0], packageJson);
  }

  const warningLines = [
    `The license field for ${packageJson.name}@${packageJson.version} contains multiple licenses:`,
    JSON.stringify(licenses),
    "We suggest you determine which license applies to your project and replace the license content",
    `for ${packageJson.name}@${packageJson.version} using a generate-license-file config file.`,
    "See: https://generate-license-file.js.org/docs/cli/config-file for more information.",
    "", // Empty line for spacing
  ];

  logger.warn(warningLines.join("\n"));

  return handleObjectLicense(licenses[0], packageJson);
};

const handleObjectLicense = (packageJsonLicence: PackageJsonLicense, packageJson: PackageJson) => {
  if (!packageJsonLicence.type) {
    return null;
  }

  return handleStringLicense(packageJsonLicence.type, packageJson);
};

const handleStringLicense = (expression: string, packageJson: PackageJson) => {
  if (expression.length === 0) {
    return null;
  }

  const containsOr = expression.includes(" OR ");
  if (containsOr) {
    const warningLines = [
      `The license expression for ${packageJson.name}@${packageJson.version} contains multiple licenses: "${expression}"`,
      "We suggest you determine which license applies to your project and replace the license content",
      `for ${packageJson.name}@${packageJson.version} using a generate-license-file config file.`,
      "See: https://generate-license-file.js.org/docs/cli/config-file for more information.",
      "", // Empty line for spacing
    ];

    logger.warn(warningLines.join("\n"));
  }

  return expression;
};
