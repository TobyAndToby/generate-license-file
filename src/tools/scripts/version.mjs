import devkit from "@nx/devkit";
import chalk from "chalk";
import { join } from "path";
import fs from "fs/promises";

const { createProjectGraphAsync, readCachedProjectGraph } = devkit;

function invariant(condition, message) {
  if (!condition) {
    console.error(chalk.bold.red(message));
    process.exit(1);
  }
}
const [, , name, version] = process.argv;

const validVersion = /^\d+\.\d+\.\d+(-\w+\.\d+)?/;
invariant(
  version && validVersion.test(version),
  `No version provided or version did not match Semantic Versioning, expected: #.#.#-tag.# or #.#.#, got ${version}.`,
);

await createProjectGraphAsync();
const graph = readCachedProjectGraph();
const project = graph.nodes[name];

invariant(
  project,
  `Could not find project "${name}" in the workspace. Is the project.json configured correctly?`,
);

const distDir = project.data.targets.build.options.outputPath;
const distPackageJson = join(distDir, "package.json");

await fs.access(distPackageJson);

const packageJsonContent = await fs.readFile(distPackageJson, "utf8");
const updatedPackageJsonContent = packageJsonContent.replace(/"\*"/g, `"${version}"`);
await fs.writeFile(distPackageJson, updatedPackageJsonContent, "utf8");
