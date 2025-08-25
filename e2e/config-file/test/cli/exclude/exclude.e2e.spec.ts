import { exec } from "child_process";
import fs from "fs/promises";
import { promisify } from "util";
import { output as outputFileName } from "./config.js";

const execAsync = promisify(exec);

describe("cli", () => {

  it("should match snapshot when content is excluded", async () => {
    const configPath = "./test/cli/exclude/config.js";

    await execAsync(`npx generate-license-file -c ${configPath}`);

    const result = await fs.readFile(outputFileName, "utf8");
    expect(result).toMatchSnapshot();

    await fs.unlink(outputFileName);
  });
});
