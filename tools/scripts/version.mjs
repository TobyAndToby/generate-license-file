import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const distPaths = {
  "generate-license-file": "packages/generate-license-file/dist",
  "webpack-plugin": "packages/webpack-plugin/dist",
};

function invariant(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const [, , name, version] = process.argv;

const validVersion = /^\d+\.\d+\.\d+(-\w+\.\d+)?/;
invariant(
  version && validVersion.test(version),
  `No version provided or version did not match Semantic Versioning, expected: #.#.#-tag.# or #.#.#, got ${version}.`,
);

invariant(name in distPaths, `Unknown package "${name}". Known packages: ${Object.keys(distPaths).join(", ")}`);

const distPackageJson = join(distPaths[name], "package.json");
const content = await readFile(distPackageJson, "utf8");
const updated = content.replace(/"\*"/g, `"${version}"`);
await writeFile(distPackageJson, updated, "utf8");
