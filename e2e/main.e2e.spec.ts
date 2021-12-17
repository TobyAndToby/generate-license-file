import { exec } from "child_process";
import path from "path";
import { promisify } from "util";
import { getProjectLicenses } from "../src/main";

const execAsync = promisify(exec);

const testFiles = ["./all-have-licenses", "./missing-license-file"];

describe("main", () => {
  describe("getProjectLicenses", () => {
    testFiles.forEach(file =>
      it(`should match snapshot for: ${file}`, async () => {
        const fullPath = path.join(__dirname, file);

        await execAsync("npm ci", { cwd: fullPath });
        const result = await getProjectLicenses(fullPath);

        expect(result).toMatchSnapshot();
      })
    );
  });
});
