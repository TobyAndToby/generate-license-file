import { exec } from "node:child_process";
import fs from "node:fs/promises";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";

const execAsync = promisify(exec);

describe("when using pnpm", () => {
  const input = "package.json";
  const output = "output.txt";

  afterEach(async () => {
    await fs.unlink(output);
  });

  it("should match the snapshot", async () => {
    await execAsync(
      `node ../../packages/generate-license-file/bin/generate-license-file --input ${input} --output ${output} --overwrite --eol lf`,
    );

    const result = await fs.readFile(output, "utf8");
    expect(result).toMatchSnapshot();
  });
});
