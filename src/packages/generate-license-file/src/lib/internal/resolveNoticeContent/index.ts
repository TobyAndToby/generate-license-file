import { glob } from "glob";
import { readFile } from "../../utils/file.utils";

type ResolvedNotice = string | null;

export const resolveNoticeContent = async (directory: string): Promise<ResolvedNotice> => {
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

  return await readFile(noticeFiles[0], { encoding: "utf-8" });
};
