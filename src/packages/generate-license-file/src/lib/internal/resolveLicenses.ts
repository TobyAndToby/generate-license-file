import { resolveDependencies } from "./resolveDependencies";

type ResolveLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
};

export type LicenseContent = string;
export type NoticeKey = string;
export type LicenseNoticeKey = `${LicenseContent}:${NoticeKey}`;

export type Dependency = {
  name: string;
  version: string | undefined;
};

export type ResolvedLicense = {
  licenseContent: LicenseContent;
  notices: string[];
  dependencies: Dependency[];
};

export const resolveLicenses = async (
  packageJsons: string[],
  options?: ResolveLicensesOptions,
): Promise<ResolvedLicense[]> => {
  const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();

  for (const packageJson of packageJsons) {
    await resolveDependencies(packageJson, licensesMap, options);
  }

  return Array.from(licensesMap.values());
};
