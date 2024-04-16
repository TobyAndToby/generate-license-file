import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";

const execAsync = promisify(exec);

describe("when using pnpm", () => {
  const input = "package.json";
  const output = "output.txt";

  afterEach(async () => {
    await fs.unlink(output);
  });

  it("should match the snapshot", async () => {
    await execAsync(
      `node "../../src/dist/packages/generate-license-file/bin/generate-license-file" --input ${input} --output ${output} --overwrite --eol lf`
    );

    const result = await fs.readFile(output, "utf8");
    expect(result).toMatchSnapshot();
  });
});
