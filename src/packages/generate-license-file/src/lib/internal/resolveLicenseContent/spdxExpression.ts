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
    logger.warn(
      `The license expression for ${packageJson.name}@${packageJson.version} contains multiple licenses: "${expression}"`,
    );
  }

  return expression;
};
