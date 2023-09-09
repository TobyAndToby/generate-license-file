import { readCachedProjectGraph, createProjectGraphAsync } from "@nx/devkit";
import chalk from "chalk";
import { execSync } from "child_process";

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

process.chdir(project.data.root);

execSync("npm --no-git-tag-version --allow-same-version version " + version);
