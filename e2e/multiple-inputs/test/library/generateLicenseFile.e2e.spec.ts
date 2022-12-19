import fs from "fs/promises";
import { generateLicenseFile } from "generate-license-file";

jest.mock("fs/promises", () => ({
  ...jest.requireActual<typeof fs>("fs/promises"),
  writeFile: jest.fn(),
  mkdir: jest.fn(),
}));

describe("generateLicenseFile", () => {
  const mockedWriteFile = jest.mocked(fs.writeFile);

  beforeEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());

  it("should match snapshot", async () => {
    const inputPaths = ["./package.json", "./../npm-package/package.json"];
    const outputPath = "/output/path.txt";

    await generateLicenseFile(inputPaths, outputPath);

    const fileContent = mockedWriteFile.mock.calls[0][1];
    expect(fileContent).toMatchSnapshot();
  });
});
