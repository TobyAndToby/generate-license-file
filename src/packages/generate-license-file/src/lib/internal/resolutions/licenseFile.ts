import { glob } from "glob";
import { Resolution } from "../resolveLicenseContent";
import logger from "../../utils/console.utils";
import { readFile } from "../../utils/file.utils";
import { extname } from "path";

const extensionDenyList = [".js", ".ts", ".sh", ".ps1"];

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
    logger.warn(
      `Found multiple license files for ${packageJson.name}@${
        packageJson.version
      }: ${filteredLicenseFiles.join(", ")}`,
    );
  }

  return await readFile(filteredLicenseFiles[0], { encoding: "utf-8" });
};
