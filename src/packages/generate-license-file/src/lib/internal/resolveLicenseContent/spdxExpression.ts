import { Resolution } from "../resolveLicenseContent";
import logger from "../../utils/console.utils";

export const spdxExpression: Resolution = async input => {
  const { packageJson } = input;

  const expression = packageJson.license;

  if (!expression) {
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
