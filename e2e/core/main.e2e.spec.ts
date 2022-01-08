import { exec } from "child_process";
import path from "path";
import { promisify } from "util";
import { getProjectLicenses } from "../../src/main";
import { testPackageJsons } from "../test-projects";

const execAsync = promisify(exec);

describe("main", () => {
  describe("getProjectLicenses", () => {
    testPackageJsons.forEach(file =>
      it(`should match snapshot for: ${file}`, async () => {
        const fullPath = path.join(__dirname, file);
        const directory = path.dirname(fullPath);

        await execAsync("npm ci", { cwd: directory });
        const result = await getProjectLicenses(fullPath);

        expect(result).toMatchSnapshot();
      })
    );
  });
});
