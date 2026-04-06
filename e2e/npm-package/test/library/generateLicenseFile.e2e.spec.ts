import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describeEachLineEnding, describeRelativeAndAbsolutePaths } from "@generate-license-file/e2e-helpers";
import { generateLicenseFile, type LineEnding } from "generate-license-file";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

const allLineEndings: LineEnding[] = ["crlf", "lf"];

describe("generateLicenseFile", () => {
  let tmpDir: string;

  beforeAll(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "glf-e2e-"));
  });

  afterAll(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  let outputCounter = 0;
  const getOutputPath = () => path.join(tmpDir, `output-${outputCounter++}.txt`);

  describeRelativeAndAbsolutePaths("./package.json", (packageJsonPath) =>
    describeEachLineEnding((lineEnding, lineEndingLiteral) => {
      let lineEndingsNotUnderTest: LineEnding[] = [];

      beforeEach(() => {
        lineEndingsNotUnderTest = allLineEndings.filter((x) => x !== lineEnding);
      });

      it("should match snapshot", async () => {
        const outputPath = getOutputPath();

        await generateLicenseFile(packageJsonPath, outputPath, { lineEnding });

        const fileContent = await fs.readFile(outputPath, "utf8");
        expect(fileContent).toMatchSnapshot();
      });

      it("should contain the correct line ending value", async () => {
        const expectedLineEndingValue = lineEndingLiteral;
        const outputPath = getOutputPath();

        await generateLicenseFile(packageJsonPath, outputPath, { lineEnding });

        const fileContent = await fs.readFile(outputPath, "utf8");
        expect(fileContent).toContain(expectedLineEndingValue);
      });

      for (const otherLineEnding of lineEndingsNotUnderTest) {
        it(`should not contain the incorrect line ending value (${otherLineEnding})`, async () => {
          const incorrectLineEndingValue = lineEndingLiteral;
          const outputPath = getOutputPath();

          await generateLicenseFile(packageJsonPath, outputPath, {
            lineEnding,
          });

          const fileContent = await fs.readFile(outputPath, "utf8");
          expect(fileContent).not.toContain(incorrectLineEndingValue);
        });
      }

      it("should write the file to the correct output path", async () => {
        const outputPath = getOutputPath();

        await generateLicenseFile(packageJsonPath, outputPath, { lineEnding });

        await expect(fs.stat(outputPath)).resolves.toBeDefined();
      });

      it("should create the output directory if it does not exist", async () => {
        const outputDirectory = path.join(tmpDir, `nested-${outputCounter++}`);
        const outputPath = path.join(outputDirectory, "filename.txt");

        await generateLicenseFile(packageJsonPath, outputPath, { lineEnding });

        await expect(fs.stat(outputDirectory)).resolves.toBeDefined();
      });
    }),
  );

  it("should omit versions when omitVersions is true", async () => {
    const outputPath = getOutputPath();

    await generateLicenseFile("./package.json", outputPath, {
      omitVersions: true,
    });

    const fileContent = await fs.readFile(outputPath, "utf8");
    expect(fileContent).toMatchSnapshot();
  });
});
