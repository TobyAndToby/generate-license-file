import { ReplacementResolution } from ".";

export const replacementHttp: ReplacementResolution = async location => {
  if (!location.startsWith("http") && !location.startsWith("www")) {
    return null;
  }

  const response = await fetch(location);
  return response.text();
};
