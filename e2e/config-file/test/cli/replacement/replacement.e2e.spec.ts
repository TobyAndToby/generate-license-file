import { exec } from "child_process";
import fs from "fs/promises";
import { promisify } from "util";
import { output as outputFileName } from "./config.js";

const execAsync = promisify(exec);

describe("cli", () => {

  it("should match snapshot when a package is replaced", async () => {
    const configPath = "./test/cli/replacement/config.js";

    await execAsync(`npx generate-license-file -c ${configPath}`);

    const result = await fs.readFile(outputFileName, "utf8");
    expect(result).toMatchSnapshot();

    await fs.unlink(outputFileName);
  });
});
