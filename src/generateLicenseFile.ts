import { getLicenseFileText } from "./getLicenseFileText";
import { writeFileAsync } from "./utils/file.utils";

/**
 * Used to specify which line endings to use in the generated file
 *
 * `windows` = "\r\n"
 *
 * `posix` = "\n"
 */
export type LineEnding = "windows" | "posix";

export function isValidEol(input: string | undefined): input is LineEnding {
  return input === "windows" || input === "posix" || input === undefined;
}

/**
 * Scans the project found at the given path and creates a license file at the given output location
 * @param pathToPackageJson A path to the package.json for the project
 * @param outputPath A file path for the resulting license file
 * @optional @param lineEnding "windows" or "posix". Will use the system default if omitted
 */
export async function generateLicenseFile(
  pathToPackageJson: string,
  outputPath: string,
  lineEnding?: LineEnding
): Promise<void> {
  const licenseFileText: string = await getLicenseFileText(pathToPackageJson, lineEnding);
  await writeFileAsync(outputPath, licenseFileText);
}
