import { ReplacementResolution } from ".";
import { doesFileExist, readFile } from "../../utils/file.utils";

export const replacementFile: ReplacementResolution = async location => {
  if (!(await doesFileExist(location))) {
    return null;
  }

  return readFile(location, { encoding: "utf-8" });
};
