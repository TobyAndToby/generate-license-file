import { exec } from "child_process";
import { stat } from "fs";
import path from "path";
import { testPackageJsons } from "../e2e/test-projects";

const npmCiTestProjects = () => {
  console.log("-----\nInstalling npm packages for e2e projects\n-----");

  for (const testProject of testPackageJsons) {
    const projectPackageJson = path.join(__dirname, "../e2e/test-projects", testProject);
    const projectDir = path.dirname(projectPackageJson);
    const projectNodeModules = path.join(projectDir, "node_modules");

    let stdOut = `Installing dependencies for ${testProject}\n`;

    isDirectory(projectNodeModules, (isDir: boolean) => {
      if (!!isDir) {
        stdOut += `Node modules for ${testProject} already exist.\n-----`;
        console.log(stdOut);
        return;
      }
      stdOut += `Node modules for ${testProject} do not exist. Installing\n`;

      exec("npm ci", { cwd: projectDir }, (err, stdout, stderr) => {
        stdOut += !!err ? stderr : stdout;
        console.log(stdOut + "-----");
      });
    });
  }
};

const isDirectory = (dir: string, callback: (isDir: boolean) => void) => {
  stat(dir, (err, stats) => {
    if (!!err) {
      return callback(false);
    }

    callback(stats.isDirectory());
  });
};

console.log("Running Post-Install");
npmCiTestProjects();
