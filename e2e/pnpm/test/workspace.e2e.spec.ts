import { exec } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const execAsync = promisify(exec);

const cli = path.resolve(process.cwd(), "../../packages/generate-license-file/bin/generate-license-file");
const depTransitive = path.resolve(process.cwd(), "../test-dependencies/dep-transitive");

// Regression test for https://github.com/TobyAndToby/generate-license-file/issues/784.
//
// In a pnpm workspace the single pnpm-lock.yaml lives at the workspace root, not beside
// each package's package.json. The CLI used to only look for the lock file beside the
// input package.json, so a workspace member was misdetected as an npm project and only
// its direct dependencies were reported.
//
// This test builds its own throwaway pnpm workspace from scratch, in a temp directory
// outside of this monorepo (so Bun's own workspace globbing never touches it), installs
// it with a real "pnpm install", and then runs the built CLI with --input pointed
// directly at the workspace member's package.json - exactly as reported in the issue.
describe("when using a pnpm workspace with the lock file at the workspace root", () => {
  let projectDir: string;
  let appDir: string;
  let output: string;

  beforeAll(async () => {
    projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "generate-license-file-e2e-pnpm-workspace-"));
    appDir = path.join(projectDir, "packages", "app");

    await fs.mkdir(appDir, { recursive: true });

    await fs.writeFile(path.join(projectDir, "package.json"), JSON.stringify({ private: true, name: "root" }, null, 2));

    await fs.writeFile(path.join(projectDir, "pnpm-workspace.yaml"), 'packages:\n  - "packages/*"\n');

    await fs.writeFile(
      path.join(appDir, "package.json"),
      JSON.stringify(
        {
          name: "app",
          version: "1.0.0",
          dependencies: {
            "dep-transitive": `file:${depTransitive}`,
          },
        },
        null,
        2,
      ),
    );

    await execAsync("pnpm install", { cwd: projectDir });
  }, 120000);

  afterAll(async () => {
    await fs.rm(projectDir, { recursive: true, force: true });
  });

  it("keeps the lock file at the workspace root, not beside the member's package.json", async () => {
    await expect(fs.stat(path.join(projectDir, "pnpm-lock.yaml"))).resolves.toBeDefined();
    await expect(fs.stat(path.join(appDir, "pnpm-lock.yaml"))).rejects.toThrow();
  });

  it("should list the transitive dependency as well as the direct one", async () => {
    output = path.join(appDir, "out.txt");

    await execAsync(
      `node ${JSON.stringify(cli)} --input ./package.json --output ${JSON.stringify(output)} --overwrite --eol lf`,
      {
        cwd: appDir,
      },
    );

    const result = await fs.readFile(output, "utf8");
    expect(result).toContain("dep-transitive@1.0.0");
    expect(result).toContain("dep-one@1.0.0");
  });
});
