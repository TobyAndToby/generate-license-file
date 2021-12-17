import { getLicenseFileText } from "./getLicenseFileText";
import { writeFileAsync } from "./utils/file.utils";

const UTF8 = "utf-8";

/**
 * Used to specify which line endings to use in the generated file
 *
 * `windows` = "\r\n"
 *
 * `posix` = "\n"
 */
export type LineEnding = "windows" | "posix";

/**
 * Scans the project found at the given path and creates a license file at the given output location
 * @param pathToPackageJson A path to a package.json
 * @param outputPath A file path for the resulting license file
 * @optional @param lineEnding "windows" or "posix". Will use the system default if omitted
 */
export async function generateLicenseFile(
  pathToPackageJson: string,
  outputPath: string,
  lineEnding?: LineEnding
): Promise<void> {
  const licenseFileText: string = await getLicenseFileText(pathToPackageJson, lineEnding);
  await writeFileAsync(outputPath, licenseFileText, { encoding: UTF8 });
}
