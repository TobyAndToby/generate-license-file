import { fetchString } from "../../utils/http.utils";
import type { ReplacementResolution } from ".";

export const replacementHttp: ReplacementResolution = async (location) => {
  if (!location.startsWith("http") && !location.startsWith("www")) {
    return null;
  }

  return fetchString(location);
};
