import { resolveLicenseContent } from "../resolveLicenseContent";
import { dirname } from "path";
import { getPnpmProjectDependencies, getPnpmVersion } from "../../utils/pnpmCli.utils";

type ResolveLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
};

export const resolveDependenciesForPnpmProject = async (
  packageJson: string,
  licensesMap: Map<string, Set<string>>,
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
      const set = licensesMap.get(licenseContent) ?? new Set<string>();
      set.add(pkgId);
      licensesMap.set(licenseContent, set);
    }
  }
};

const verifyPnpmVersion = async () => {
  const pnpmVersion = await getPnpmVersion();

  if (pnpmVersion.major === 8) {
    return;
  }

  const errorLines = [
    `Unsupported pnpm version: ${pnpmVersion.major}.${pnpmVersion.minor}.${pnpmVersion.patch}.`,
    "Generate license file currently only supports pnpm version 8.x.x",
    "Please either switch to pnpm version 8 or raise an issue on the generate-license-file repository for us to support your version of pnpm:",
    "https://github.com/TobyAndToby/generate-license-file",
  ];

  throw new Error(errorLines.join("\n"));
};
