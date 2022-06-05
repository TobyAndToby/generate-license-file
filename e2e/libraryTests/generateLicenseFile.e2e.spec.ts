import fs from "fs/promises";
import { mocked } from "ts-jest/utils";
import { allLineEndings, getLineEndingValue } from "../../src/lineEndings";
import { generateLicenseFile, LineEnding } from "../../src/main";
import { describeEachLineEnding } from "../describes/lineEndings";
import { describeAllTestPackagesAtOnce, describeEachTestPackage } from "../describes/testPackages";

jest.mock("fs/promises", () => ({
  ...jest.requireActual<typeof fs>("fs/promises"),
  writeFile: jest.fn(),
  mkdir: jest.fn()
}));

describe("generateLicenseFile", () => {
  const mockedWriteFile = mocked(fs.writeFile);
  const mockedMkdir = mocked(fs.mkdir);

  beforeEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());

  describeEachTestPackage(packageJsonUnderTest =>
    describeEachLineEnding(lineEnding => {
      let lineEndingsNotUnderTest: LineEnding[] = [];

      beforeEach(() => {
        lineEndingsNotUnderTest = allLineEndings.filter(x => x !== lineEnding);
      });

      it("should match snapshot", async () => {
        const outputPath = "/output/path.txt";

        await generateLicenseFile(packageJsonUnderTest, outputPath, lineEnding);

        const fileContent = mockedWriteFile.mock.calls[0][1];
        expect(fileContent).toMatchSnapshot();
      });

      it("should contain the correct line ending value", async () => {
        const expectedLineEndingValue = getLineEndingValue(lineEnding);
        const outputPath = "/output/path.txt";

        await generateLicenseFile(packageJsonUnderTest, outputPath, lineEnding);

        const fileContent = mockedWriteFile.mock.calls[0][1];
        expect(fileContent).toContain(expectedLineEndingValue);
      });

      lineEndingsNotUnderTest.forEach(otherLineEnding =>
        it(`should not contain the incorrect line ending value (${otherLineEnding})`, async () => {
          const incorrectLineEndingValue = getLineEndingValue(otherLineEnding);
          const outputPath = "/output/path.txt";

          await generateLicenseFile(packageJsonUnderTest, outputPath, lineEnding);

          const fileContent = mockedWriteFile.mock.calls[0][1];
          expect(fileContent).not.toContain(incorrectLineEndingValue);
        })
      );

      it("should write the file to the correct output path", async () => {
        const outputPath = "/output/path.txt";

        await generateLicenseFile(packageJsonUnderTest, outputPath, lineEnding);

        const filePath = mockedWriteFile.mock.calls[0][0];
        expect(filePath).toBe(outputPath);
      });

      it("should create the output directory if it does not exist", async () => {
        const outputDirectory = "/output/path";
        const outputPath = outputDirectory + "/filename.txt";

        await generateLicenseFile(packageJsonUnderTest, outputPath, lineEnding);

        const directoryPath = mockedMkdir.mock.calls[0][0];
        expect(directoryPath).toBe(outputDirectory);
      });
    })
  );

  describeAllTestPackagesAtOnce(packageJsonsUnderTest => {
    it("should match snapshot", async () => {
      const outputPath = "/output/path.txt";

      await generateLicenseFile(packageJsonsUnderTest, outputPath);

      const fileContent = mockedWriteFile.mock.calls[0][1];
      expect(fileContent).toMatchSnapshot();
    });
  });
});
