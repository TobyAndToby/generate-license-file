import { execSync } from "node:child_process";
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

const [, , name, tag = "next"] = process.argv;

invariant(name in distPaths, `Unknown package "${name}". Known packages: ${Object.keys(distPaths).join(", ")}`);

process.chdir(join(distPaths[name]));

execSync(`npm publish --access public --provenance --tag ${tag}`, { stdio: "inherit" });
