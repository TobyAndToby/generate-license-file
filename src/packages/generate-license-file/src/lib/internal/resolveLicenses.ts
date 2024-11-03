import { resolveDependencies } from "./resolveDependencies";

type ResolveLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
};

export type LicenseContent = string;
export type NoticeContent = string;
export type LicenseNoticePair = `${LicenseContent}:${NoticeContent}`;

export type Dependency = {
  name: string;
  version: string | undefined;
};

export type ResolvedLicense = {
  licenseContent: LicenseContent;
  noticeContent: NoticeContent | null;
  dependencies: Dependency[];
};

export const resolveLicenses = async (
  packageJsons: string[],
  options?: ResolveLicensesOptions,
): Promise<ResolvedLicense[]> => {
  const licensesMap = new Map<LicenseNoticePair, ResolvedLicense>();

  for (const packageJson of packageJsons) {
    await resolveDependencies(packageJson, licensesMap, options);
  }

  return Array.from(licensesMap.values());
};
