import {
  describeEachLineEnding,
  describeRelativeAndAbsolutePaths,
} from "@generate-license-file/e2e-helpers";
import fs from "fs/promises";
import { generateLicenseFile, LineEnding } from "generate-license-file";
import { lineEndings } from "generate-license-file/src/lib/lineEndings";

jest.mock("fs/promises", () => ({
  ...jest.requireActual<typeof fs>("fs/promises"),
  writeFile: jest.fn(),
  mkdir: jest.fn(),
}));

describe("generateLicenseFile", () => {
  const mockedWriteFile = jest.mocked(fs.writeFile);
  const mockedMkdir = jest.mocked(fs.mkdir);

  beforeEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());

  describeRelativeAndAbsolutePaths("./package.json", (packageJsonPath) =>
    describeEachLineEnding((lineEnding, lineEndingLiteral) => {
      let lineEndingsNotUnderTest: LineEnding[] = [];

      beforeEach(() => {
        lineEndingsNotUnderTest = lineEndings.filter((x) => x !== lineEnding);
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

      lineEndingsNotUnderTest.forEach((otherLineEnding) =>
        it(`should not contain the incorrect line ending value (${otherLineEnding})`, async () => {
          const incorrectLineEndingValue = lineEndingLiteral;
          const outputPath = "/output/path.txt";

          await generateLicenseFile(packageJsonPath, outputPath, {
            lineEnding,
          });

          const fileContent = mockedWriteFile.mock.calls[0][1];
          expect(fileContent).not.toContain(incorrectLineEndingValue);
        })
      );

      it("should write the file to the correct output path", async () => {
        const outputPath = "/output/path.txt";

        await generateLicenseFile(packageJsonPath, outputPath, { lineEnding });

        const filePath = mockedWriteFile.mock.calls[0][0];
        expect(filePath).toBe(outputPath);
      });

      it("should create the output directory if it does not exist", async () => {
        const outputDirectory = "/output/path";
        const outputPath = outputDirectory + "/filename.txt";

        await generateLicenseFile(packageJsonPath, outputPath, { lineEnding });

        const directoryPath = mockedMkdir.mock.calls[0][0];
        expect(directoryPath).toBe(outputDirectory);
      });
    })
  );

  it("should omit versions when omitVersions is true", async () => {
    await generateLicenseFile("./package.json", "/output/path.txt", {
      omitVersions: true,
    });

    const fileContent = mockedWriteFile.mock.calls[0][1];
    expect(fileContent).toMatchSnapshot();
  });
});
