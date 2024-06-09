import { ReplacementResolution } from ".";
import { readFile } from "../../utils/file.utils";

export const replacementFile: ReplacementResolution = async location => {
  try {
    return readFile(location, { encoding: "utf-8" });
  } catch {
    return null;
  }
};
