import { exec } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const execAsync = promisify(exec);

const cli = path.resolve(process.cwd(), "../../packages/generate-license-file/bin/generate-license-file");
const depOne = path.resolve(process.cwd(), "../test-dependencies/dep-one");

// Regression test for https://github.com/TobyAndToby/generate-license-file/issues/754.
//
// The other tests in this package (test/index.e2e.spec.ts) rely on node_modules that Bun
// creates while installing this whole repo's own workspaces, and Bun happens to give every
// nested package its own local node_modules folder. That never reproduces the real bug,
// which only shows up when a workspace member has NO node_modules
// of its own and its dependencies are hoisted up into the workspace root's node_modules -
// which is what a real "npm install" against an npm-workspaces project actually does.
//
// So this test builds its own throwaway npm-workspaces project from scratch, in a temp
// directory outside of this monorepo (so Bun's own workspace globbing never touches it),
// installs it with a real "npm install", and then runs the built CLI with --input pointed
// directly at the workspace member's package.json - exactly as reported in the issue.
describe("when using a real npm-workspaces install with hoisted node_modules", () => {
  let projectDir: string;
  let uiDir: string;
  let output: string;

  beforeAll(async () => {
    projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "generate-license-file-e2e-hoisted-"));
    uiDir = path.join(projectDir, "packages", "ui");

    await fs.mkdir(uiDir, { recursive: true });

    await fs.writeFile(
      path.join(projectDir, "package.json"),
      JSON.stringify({ private: true, name: "root", workspaces: ["packages/*"] }, null, 2),
    );

    await fs.writeFile(
      path.join(uiDir, "package.json"),
      JSON.stringify(
        {
          name: "ui",
          version: "1.0.0",
          dependencies: {
            "dep-one": `file:${depOne}`,
          },
        },
        null,
        2,
      ),
    );

    await execAsync("npm install --no-audit --no-fund", { cwd: projectDir });
  }, 60000);

  afterAll(async () => {
    await fs.rm(projectDir, { recursive: true, force: true });
  });

  it("hoists the workspace member's dependencies up to the root node_modules, not the member's own", async () => {
    await expect(fs.stat(path.join(uiDir, "node_modules"))).rejects.toThrow();
    await expect(fs.stat(path.join(projectDir, "node_modules", "dep-one"))).resolves.toBeDefined();
  });

  it("should still find the workspace member's dependencies when input is the member's own package.json", async () => {
    output = path.join(uiDir, "out.txt");

    await execAsync(
      `node ${JSON.stringify(cli)} --input ./package.json --output ${JSON.stringify(output)} --overwrite --eol lf`,
      {
        cwd: uiDir,
      },
    );

    const result = await fs.readFile(output, "utf8");
    expect(result).toContain("dep-one@1.0.0");
    expect(result).toContain("This license file is spelt `LICENSE.md`.");
  });
});
