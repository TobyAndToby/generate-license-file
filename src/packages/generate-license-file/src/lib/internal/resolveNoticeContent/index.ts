import { glob } from "glob";
import { relative } from "path";
import logger from "../../utils/console.utils";
import { readFile } from "../../utils/file.utils";
import { ResolutionInputs } from "../resolveLicenseContent";

type ResolvedNotice = string | null;

export const resolveNoticeContent = async (inputs: ResolutionInputs): Promise<ResolvedNotice> => {
  const { directory, packageJson } = inputs;
  const noticeFiles = await glob("notice{,-*,.*}", {
    nocase: true,
    nodir: true,
    absolute: true,
    cwd: directory,
    maxDepth: 1,
  });

  if (noticeFiles.length === 0) {
    return null;
  }

  if (noticeFiles.length > 1) {
    const relativeNoticeFiles = noticeFiles.map(file => ` - ./${relative(directory, file)}`);

    const warningLines = [
      `Found multiple notice files for ${packageJson.name}@${packageJson.version}:`,
      ...relativeNoticeFiles,
      "We suggest you determine which file(s) you wish to include and use a config file to configure the output for this package.",
      "See: https://generate-license-file.js.org/docs/cli/config-file for more information.",
      "", // Empty line for spacing
    ];

    logger.warn(warningLines.join("\n"));
  }

  return await readFile(noticeFiles[0], { encoding: "utf-8" });
};
