import { glob } from "glob";
import { readFile } from "../../utils/file.utils";

export const resolveNotices = async (directory: string): Promise<string[]> => {
  const noticeFiles = await glob("notice{,-*,.*}", {
    nocase: true,
    nodir: true,
    absolute: true,
    cwd: directory,
    maxDepth: 1,
  });

  if (noticeFiles.length === 0) {
    return [];
  }

  const contents = await Promise.all(
    noticeFiles.map(async f => await readFile(f, { encoding: "utf-8" })),
  );

  return contents;
};
