import path from "path";
import { testPackageJsons } from "../test-projects";
import {
  assertFile,
  deleteIfExists,
  ensureExists,
  getProjectDirectoryUnderTest,
  installAndRun
} from "./utils";

describe("cli", () => {
  testPackageJsons.forEach(packageJsonUnderTest =>
    describe("absolute file paths", () => {
      const directoryUnderTest = getProjectDirectoryUnderTest(__dirname, packageJsonUnderTest);

      it(`should equal expected when output doesn't exist for ${packageJsonUnderTest}`, async () => {
        const outputFileName = "output-doesnt-exist-result-absolute.txt";

        const absoluteInput = path.join(directoryUnderTest, "package.json");
        const absoluteOutput = path.join(directoryUnderTest, outputFileName);

        await deleteIfExists(outputFileName, directoryUnderTest);

        await installAndRun(
          directoryUnderTest,
          `npx generate-license-file --input ${absoluteInput} --output ${absoluteOutput}`
        );

        await assertFile(directoryUnderTest, outputFileName);
      });

      it(`should equal expected when output exists and overwrite is true for ${packageJsonUnderTest}`, async () => {
        const outputFileName = "output-exists-with-overwrite-result-absolute.txt";

        const absoluteInput = path.join(directoryUnderTest, "package.json");
        const absoluteOutput = path.join(directoryUnderTest, outputFileName);

        await ensureExists(outputFileName, directoryUnderTest);

        await installAndRun(
          directoryUnderTest,
          `npx generate-license-file --input ${absoluteInput} --output ${absoluteOutput} --overwrite`
        );

        await assertFile(directoryUnderTest, outputFileName);
      });
    })
  );
});
