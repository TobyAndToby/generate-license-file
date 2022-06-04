import { exec } from "child_process";
import { stat } from "fs/promises";
import path from "path";
import { testPackageJsons } from "../e2e/describes/testPackages";

const npmCiPackageJson = (absolutePathToPackageJson: string) =>
  new Promise<void>(async (resolve, reject) => {
    const projectDir = path.dirname(absolutePathToPackageJson);
    const projectNodeModulesDir = path.join(projectDir, "node_modules");

    console.log(`Checking for node_modules dir in ${absolutePathToPackageJson}`);

    const isDir = await isDirectory(projectNodeModulesDir);
    if (isDir) {
      console.log(`node_modules dir in ${projectDir} already exists. Skipping`);
      resolve();
      return;
    }

    console.log(`node_modules dir in ${projectDir} does not exist. Installing`);

    exec("npm ci", { cwd: projectDir }, (err, stdout, stderr) => {
      console.log(!!err ? stderr : stdout);
      !!err ? reject(err) : resolve();
    });
  });

const npmBuildPackageJson = (absolutePathToPackageJson: string) =>
  new Promise<void>(async (resolve, reject) => {
    const projectDir = path.dirname(absolutePathToPackageJson);
    const projectDistDir = path.join(projectDir, "dist");

    console.log(`Checking for dist dir in ${absolutePathToPackageJson}`);

    const isDir = await isDirectory(projectDistDir);
    if (isDir) {
      console.log(`dist dir in ${projectDir} already exists. Skipping`);
      resolve();
      return;
    }

    console.log(`dist dir in ${projectDir} does not exist. Building`);

    exec("npm run build", { cwd: projectDir }, (err, stdout, stderr) => {
      console.log(!!err ? stderr : stdout);
      !!err ? reject(err) : resolve();
    });
  });

const npmCiMainProject = async () => {
  console.log("\n-----\nInstalling npm packages for main project\n-----");

  const mainPackageJson = path.join(__dirname, "..", "package.json");
  await npmCiPackageJson(mainPackageJson);
};

const npmBuildMainProject = async () => {
  console.log("\n-----\nBuilding main project\n-----");

  const mainPackageJson = path.join(__dirname, "..", "package.json");
  await npmBuildPackageJson(mainPackageJson);
};

const npmCiTestProjects = async () => {
  for (const testProject of testPackageJsons) {
    console.log(`\n-----\nInstalling npm packages for e2e project ${testProject}\n-----`);
    const projectPackageJson = path.join(__dirname, "../e2e/testProjects", testProject);
    await npmCiPackageJson(projectPackageJson);
  }
};

const isDirectory = async (dir: string): Promise<boolean> => {
  try {
    const statResult = await stat(dir);
    return statResult.isDirectory();
  } catch {
    return false;
  }
};

(async () => {
  console.log("Running pre-e2e script");
  await npmCiMainProject();
  await npmBuildMainProject();
  await npmCiTestProjects();
  console.log("Finished running pre-e2e script");
})();
