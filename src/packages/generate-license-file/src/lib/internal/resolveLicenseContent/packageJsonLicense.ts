import { doesFileExist, readFile } from "../../utils/file.utils";
import logger from "../../utils/console.utils";
import { join } from "path";
import { Resolution } from "../resolveLicenseContent";

export const packageJsonLicense: Resolution = async inputs => {
  const { packageJson, directory } = inputs;

  const spdxExpression = packageJson.license;

  if (!spdxExpression) {
    return null;
  }

  if (!spdxExpression.toLowerCase().startsWith("see license in ")) {
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
