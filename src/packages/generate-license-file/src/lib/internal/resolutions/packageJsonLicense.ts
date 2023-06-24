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

  return await readLicense(directory, licenseFilePath);
};

const sanitise = (str: string) => str.replace(/['<>]/g, "");

const readLicense = async (dir: string, path: string): Promise<string | null> => {
  if (path.startsWith("http")) {
    // TODO
    return null;
  }

  const absolutePath = join(dir, path);

  global.console.log(`Found license in package.json: ${absolutePath}`);

  const fileExists = await doesFileExist(path);
  if (!fileExists) {
    logger.warn(`Could not find license file '${absolutePath}'`);
    return null;
  }

  return await readFile(absolutePath, { encoding: "utf-8" });
};
