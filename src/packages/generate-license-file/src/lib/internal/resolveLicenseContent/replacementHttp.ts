import { ReplacementResolution } from ".";
import { fetchString } from "../../utils/http.utils";

export const replacementHttp: ReplacementResolution = async location => {
  if (!location.startsWith("http") && !location.startsWith("www")) {
    return null;
  }

  return fetchString(location);
};
