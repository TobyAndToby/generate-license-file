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
    describe("relative file paths", () => {
      const directoryUnderTest = getProjectDirectoryUnderTest(__dirname, packageJsonUnderTest);

      it(`should equal expected when output doesn't exist for ${packageJsonUnderTest}`, async () => {
        const outputFileName = "output-doesnt-exist-result-relative.txt";

        await deleteIfExists(outputFileName, directoryUnderTest);

        await installAndRun(
          directoryUnderTest,
          `npx generate-license-file --input package.json --output ${outputFileName}`
        );

        await assertFile(directoryUnderTest, outputFileName);
      });

      it(`should equal expected when output exists and overwrite is true for ${packageJsonUnderTest}`, async () => {
        const outputFileName = "output-exists-with-overwrite-result-relative.txt";

        await ensureExists(outputFileName, directoryUnderTest);

        await installAndRun(
          directoryUnderTest,
          `npx generate-license-file --input package.json --output ${outputFileName} --overwrite`
        );

        await assertFile(directoryUnderTest, outputFileName);
      });
    })
  );
});
