import { testPackageJsons } from "../test-projects";
import {
  assertFile,
  deleteIfExists,
  ensureExists,
  execAsync,
  getProjectDirectoryUnderTest
} from "./utils";

describe("cli for relative file paths", () => {
  testPackageJsons.forEach(packageJsonUnderTest =>
    describe(`for: ${packageJsonUnderTest}`, () => {
      const directoryUnderTest = getProjectDirectoryUnderTest(packageJsonUnderTest);

      it(`should equal expected when output doesn't exist`, async () => {
        const outputFileName = "output-doesnt-exist-result-relative.txt";

        await deleteIfExists(outputFileName, directoryUnderTest);

        await execAsync(
          `npx generate-license-file --input package.json --output ${outputFileName}`,
          { cwd: directoryUnderTest }
        );

        await assertFile(directoryUnderTest, outputFileName);
      });

      it(`should equal expected when output exists and overwrite is true`, async () => {
        const outputFileName = "output-exists-with-overwrite-result-relative.txt";

        await ensureExists(outputFileName, directoryUnderTest);

        await execAsync(
          `npx generate-license-file --input package.json --output ${outputFileName} --overwrite`,
          { cwd: directoryUnderTest }
        );

        await assertFile(directoryUnderTest, outputFileName);
      });
    })
  );
});
