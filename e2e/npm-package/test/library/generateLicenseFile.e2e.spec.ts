import fs from "node:fs/promises";
import { describeEachLineEnding, describeRelativeAndAbsolutePaths } from "@generate-license-file/e2e-helpers";
import { generateLicenseFile, type LineEnding } from "generate-license-file";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("node:fs/promises", async importOriginal => {
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  return {
    ...actual,
    default: { ...actual, writeFile: vi.fn(), mkdir: vi.fn() },
  };
});

const allLineEndings: LineEnding[] = ["crlf", "lf"];

describe("generateLicenseFile", () => {
  const mockedWriteFile = vi.mocked(fs.writeFile);
  const mockedMkdir = vi.mocked(fs.mkdir);

  beforeEach(() => vi.resetAllMocks());
  afterAll(() => vi.restoreAllMocks());

  describeRelativeAndAbsolutePaths("./package.json", packageJsonPath =>
    describeEachLineEnding((lineEnding, lineEndingLiteral) => {
      let lineEndingsNotUnderTest: LineEnding[] = [];

      beforeEach(() => {
        lineEndingsNotUnderTest = allLineEndings.filter(x => x !== lineEnding);
      });

      it("should match snapshot", async () => {
        const outputPath = "/output/path.txt";

        await generateLicenseFile(packageJsonPath, outputPath, { lineEnding });

        const fileContent = mockedWriteFile.mock.calls[0][1];
        expect(fileContent).toMatchSnapshot();
      });

      it("should contain the correct line ending value", async () => {
        const expectedLineEndingValue = lineEndingLiteral;
        const outputPath = "/output/path.txt";

        await generateLicenseFile(packageJsonPath, outputPath, { lineEnding });

        const fileContent = mockedWriteFile.mock.calls[0][1];
        expect(fileContent).toContain(expectedLineEndingValue);
      });

      for (const otherLineEnding of lineEndingsNotUnderTest) {
        it(`should not contain the incorrect line ending value (${otherLineEnding})`, async () => {
          const incorrectLineEndingValue = lineEndingLiteral;
          const outputPath = "/output/path.txt";

          await generateLicenseFile(packageJsonPath, outputPath, {
            lineEnding,
          });

          const fileContent = mockedWriteFile.mock.calls[0][1];
          expect(fileContent).not.toContain(incorrectLineEndingValue);
        });
      }

      it("should write the file to the correct output path", async () => {
        const outputPath = "/output/path.txt";

        await generateLicenseFile(packageJsonPath, outputPath, { lineEnding });

        const filePath = mockedWriteFile.mock.calls[0][0];
        expect(filePath).toBe(outputPath);
      });

      it("should create the output directory if it does not exist", async () => {
        const outputDirectory = "/output/path";
        const outputPath = `${outputDirectory}/filename.txt`;

        await generateLicenseFile(packageJsonPath, outputPath, { lineEnding });

        const directoryPath = mockedMkdir.mock.calls[0][0];
        expect(directoryPath).toBe(outputDirectory);
      });
    }),
  );

  it("should omit versions when omitVersions is true", async () => {
    await generateLicenseFile("./package.json", "/output/path.txt", {
      omitVersions: true,
    });

    const fileContent = mockedWriteFile.mock.calls[0][1];
    expect(fileContent).toMatchSnapshot();
  });
});
