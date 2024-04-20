import { resolveLicenseContent } from "../resolveLicenseContent";
import { dirname } from "path";
import { getPnpmProjectDependencies, getPnpmVersion } from "../../utils/pnpmCli.utils";
import { Dependency, LicenseContent } from "../resolveLicenses";

type ResolveLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
  omitVersion?: boolean;
};

export const resolveDependenciesForPnpmProject = async (
  packageJson: string,
  licensesMap: Map<LicenseContent, Dependency[]>,
  options?: ResolveLicensesOptions,
) => {
  const replacements = options?.replace ?? {};
  const exclude = options?.exclude ?? [];

  await verifyPnpmVersion();

  const projectDirectory = dirname(packageJson);
  const dependencies = await getPnpmProjectDependencies(projectDirectory);

  for (const dependency of dependencies) {
    const pkgId = `${dependency.name}@${dependency.version}`;

    if (exclude.includes(pkgId)) {
      continue;
    }

    const licenseContent = await resolveLicenseContent(dependency.path, replacements);

    if (licenseContent) {
      const dependencies = licensesMap.get(licenseContent) ?? [];

      const alreadyExists = dependencies.find(
        dep => dep.name === dependency.name && dep.version === dependency.version,
      );

      if (!alreadyExists) {
        dependencies.push({ name: dependency.name, version: dependency.version });
      }

      licensesMap.set(licenseContent, dependencies);
    }
  }
};

const allowedPnpmMinorVersions: Record<number, number> = {
  8: 0,
  7: 33,
};

const verifyPnpmVersion = async () => {
  const pnpmVersion = await getPnpmVersion();

  const allowedMinorVersion = allowedPnpmMinorVersions[pnpmVersion.major];
  if (allowedMinorVersion !== undefined && pnpmVersion.minor >= allowedMinorVersion) {
    return;
  }

  const errorLines = [
    `Unsupported pnpm version: ${pnpmVersion.major}.${pnpmVersion.minor}.${pnpmVersion.patch}.`,
    "Generate license file currently only supports pnpm versions >=7.33.0 & >=8.0.0",
    "Please either switch to a supported version of pnpm or raise an issue on the generate-license-file repository for us to support your version of pnpm:",
    "https://github.com/TobyAndToby/generate-license-file",
  ];

  throw new Error(errorLines.join("\n"));
};
