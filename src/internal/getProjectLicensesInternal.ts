import { ModuleInfo } from "license-checker";
import { License } from "../models/license";
import console from "../utils/console.utils";
import { doesFileExist, doesFolderExist, readFileAsync } from "../utils/file.utils";
import { getProject, Project } from "../utils/license.utils";

const UTF8 = "utf-8";

export async function getProjectLicensesInternal(path: string): Promise<License[]> {
  try {
    const dependencyLicenses = await getDependencyMapForProject(path);

  const licenses = flattenDependencyMapToLicenseArray(dependencyLicenses);
  return licenses;
  } catch (error) {
    console.error(error.message);
    return Promise.reject();
  }
}

const getDependencyMapForProject = async (path: string) => {
  if (!(await doesFolderExist(path))) {
    throw new Error("Cannot find directory " + path);
  }

  const project: Project = await getProject({
    start: path,
    production: true
  });

  const projectDependencies = groupProjectDependenciesByLicenseText(project);
  return projectDependencies;
};

const groupProjectDependenciesByLicenseText = async (project: Project) => {
  const dependencyLicenses: Map<string, string[]> = new Map<string, string[]>();

  for (const [dependencyName, dependencyValue] of Object.entries(project)) {
    const license: string = await getLicenseContent(dependencyValue);

    const listForLicense = dependencyLicenses.get(license) ?? [];
    listForLicense.push(dependencyName);

    dependencyLicenses.set(license, listForLicense);
  }

  return dependencyLicenses;
};

const getLicenseContent = async (moduleInfo: ModuleInfo) => {
  const licenseFilePath: string | undefined = moduleInfo.licenseFile;

  if (!!licenseFilePath && (await doesFileExist(licenseFilePath))) {
    return await readFileAsync(licenseFilePath, { encoding: UTF8 });
  }

  return getLicenseType(moduleInfo);
};

const getLicenseType = (moduleInfo: ModuleInfo) => {
  const { licenses } = moduleInfo;

  if (!!licenses && licenses.length > 0) {
    const licenseType = typeof licenses === "string" ? licenses : licenses[0];
    return `(${licenseType})`;
  }

  console.warn(`No license found for ${moduleInfo.name}!`);
  return "Unknown license!";
};

const flattenDependencyMapToLicenseArray = (dependencyLicenses: Map<string, string[]>) => {
  const licenses: License[] = [];

  for (const [license, dependencies] of dependencyLicenses) {
    licenses.push(new License(license, dependencies));
  }

  return licenses;
};
