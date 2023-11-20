import { exec } from "child_process";
import fs from "fs/promises";
import { promisify } from "util";
import * as OutputFileNames from "../../output-filenames.js";

const execAsync = promisify(exec);

describe("cli", () => {
  beforeEach(async () => {});

  it("should match snapshot when inputs and outputs are provided via config file", async () => {
    const configPath = "./test/cli/inputs-output/config.js";
    const outputPath = OutputFileNames.InputsOutputConfig;

    await execAsync(`npx generate-license-file -c ${configPath}`);

    const result = await fs.readFile(outputPath, "utf8");
    expect(result).toMatchSnapshot();

    await fs.unlink(outputPath);
  });
});
