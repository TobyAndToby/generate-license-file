import devkit from "@nx/devkit";
import chalk from "chalk";
import { execSync } from "child_process";
import fs from "fs/promises";
import path from "path";

const { readCachedProjectGraph, createProjectGraphAsync } = devkit;

function invariant(condition, message) {
  if (!condition) {
    console.error(chalk.bold.red(message));
    process.exit(1);
  }
}

const [, , name] = process.argv;

await createProjectGraphAsync();
const graph = readCachedProjectGraph();
const project = graph.nodes[name];

invariant(
  project,
  `Could not find project "${name}" in the workspace. Is the project.json configured correctly?`,
);

const buildOutputPath = project.data?.targets?.build?.options?.outputPath;
invariant(
  buildOutputPath,
  `Could not find "build.options.outputPath" of project "${name}". Is project.json configured correctly?`,
);

const packOutputPath = project.data?.targets?.pack?.options?.outputPath;
invariant(
  packOutputPath,
  `Could not find "pack.options.outputPath" of project "${name}". Is project.json configured correctly?`,
);
const absolutePackOutputPath = path.resolve(packOutputPath);

if (!(await fs.stat(absolutePackOutputPath).catch(() => false))) {
  await fs.mkdir(absolutePackOutputPath, { recursive: true });
}

process.chdir(buildOutputPath);

execSync(`npm pack --pack-destination ${absolutePackOutputPath}`);
