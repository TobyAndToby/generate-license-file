import { exec } from "child_process";
import fs from "fs/promises";
import { promisify } from "util";

const execAsync = promisify(exec);

describe("cli", () => {
  let output = "";

  beforeEach(async () => {
    output = `./test-${Math.floor(Math.random() * 1000)}.txt`;
  });

  afterEach(async () => {
    await fs.unlink(output);
  });

  it("should match snapshot", async () => {
    await execAsync(
      `npx generate-license-file --input ./package.json --output ${output}`
    );

    const result = await fs.readFile(output, "utf8");
    expect(result).toMatchSnapshot();
  });
});
