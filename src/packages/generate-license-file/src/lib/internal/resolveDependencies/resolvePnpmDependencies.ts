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
};
