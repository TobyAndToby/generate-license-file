import { ModuleInfo } from "license-checker";
import { License } from "../models/license";
import console from "../utils/console.utils";
import { doesFileExist, doesFolderExist, readFileAsync } from "../utils/file.utils";
import { getProject, Project } from "../utils/licence.utils";

const UTF8 = "utf-8";

export async function getProjectLicensesInternal(path: string): Promise<License[]> {
  try {
    const dependencyLicenses = await getDependencyMapForProject(path);

    const licences = flattenDependencyMapToLicenceArray(dependencyLicenses);
    return licences;
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

    if (!dependencyLicenses.has(license)) {
      dependencyLicenses.set(license, []);
    }

    dependencyLicenses.get(license)?.push(dependencyName);
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
    const licenceType = typeof licenses === "string" ? licenses : licenses[0];
    return `(${licenceType})`;
  }

  console.warn(`No license found for ${moduleInfo.name}!`);
  return "Unknown Licence!";
};

const flattenDependencyMapToLicenceArray = (dependencyLicenses: Map<string, string[]>) => {
  const licences: License[] = [];

  for (const [license, dependencies] of dependencyLicenses) {
    licences.push(new License(license, dependencies));
  }

  return licences;
};
