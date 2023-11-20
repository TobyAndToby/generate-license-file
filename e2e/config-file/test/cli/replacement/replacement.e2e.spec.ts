import { exec } from "child_process";
import fs from "fs/promises";
import { promisify } from "util";
import * as OutputFileNames from "../../output-filenames.js";

const execAsync = promisify(exec);

describe("cli", () => {
  beforeEach(async () => {});

  it("should match snapshot when a package is replaced", async () => {
    const configPath = "./.config/replacement-config.js";
    const outputPath = OutputFileNames.ReplacementConfig;

    await execAsync(`npx generate-license-file -c ${configPath}`);

    const result = await fs.readFile(outputPath, "utf8");
    expect(result).toMatchSnapshot();

    await fs.unlink(outputPath);
  });
});
