import { PackageJson } from "../utils/packageJson.utils";
import { satisfies } from "semver";

export const findMatchingSemver = (
  sortedPackageIdsHaystack: string[],
  packageJson: PackageJson,
): string | null => {
  for (const pkgid of sortedPackageIdsHaystack) {
    const [haystackName, haystackVersion] = splitPackageId(pkgid);

    if (packageJson.name === haystackName) {
      if (!haystackVersion) {
        return pkgid;
      }

      if (packageJson.version && satisfies(packageJson.version, haystackVersion)) {
        return pkgid;
      }
    }
  }

  return null;
};

const splitPackageId = (pkgid: string): [string, string | null] => {
  const delimiter = pkgid.lastIndexOf("@");

  if (delimiter <= 0) {
    // This may or may not be a scoped package, either way it has no version.
    // So return the name and no version.
    return [pkgid, null];
  }

  const name = pkgid.substring(0, delimiter);
  const version = pkgid.substring(delimiter + 1);

  return [name, version];
};
