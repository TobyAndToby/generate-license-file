import path from "path";
import { testPackageJsons } from "../test-projects";
import {
  assertFile,
  deleteIfExists,
  ensureExists,
  execAsync,
  getProjectDirectoryUnderTest
} from "./utils";

describe("cli for absolute file paths", () => {
  testPackageJsons.forEach(packageJsonUnderTest =>
    describe(`for: ${packageJsonUnderTest}`, () => {
      const directoryUnderTest = getProjectDirectoryUnderTest(packageJsonUnderTest);

      it(`should equal expected when output doesn't exist`, async () => {
        const outputFileName = "output-doesnt-exist-result-absolute.txt";

        const absoluteInput = path.join(directoryUnderTest, "package.json");
        const absoluteOutput = path.join(directoryUnderTest, outputFileName);

        await deleteIfExists(outputFileName, directoryUnderTest);

        await execAsync(
          `npx generate-license-file --input ${absoluteInput} --output ${absoluteOutput}`,
          { cwd: directoryUnderTest }
        );

        await assertFile(directoryUnderTest, outputFileName);
      });

      it(`should equal expected when output exists and overwrite is true`, async () => {
        const outputFileName = "output-exists-with-overwrite-result-absolute.txt";

        const absoluteInput = path.join(directoryUnderTest, "package.json");
        const absoluteOutput = path.join(directoryUnderTest, outputFileName);

        await ensureExists(outputFileName, directoryUnderTest);

        await execAsync(
          `npx generate-license-file --input ${absoluteInput} --output ${absoluteOutput} --overwrite`,
          { cwd: directoryUnderTest }
        );

        await assertFile(directoryUnderTest, outputFileName);
      });
    })
  );
});
