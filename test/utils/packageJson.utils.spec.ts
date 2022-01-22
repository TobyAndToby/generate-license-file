import { mocked } from "ts-jest/utils";
import { doesFileExist, readFileAsync } from "../../src/utils/file.utils";
import { readPackageJson } from "../../src/utils/packageJson.utils";

jest.mock("../../src/utils/file.utils", () => ({
  doesFileExist: jest.fn(),
  readFileAsync: jest.fn()
}));

describe("Package.json Utils", () => {
  const mockedDoesFileExist = mocked(doesFileExist);
  const mockedReadFileAsync = mocked(readFileAsync);

  const pathToPackageJson = "./path/to/package.json";

  beforeEach(() => {
    jest.resetAllMocks();

    mockedReadFileAsync.mockResolvedValue(`{ "name": "test-project", "version": "1.2.3" }`);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("readPackageJson", () => {
    it("should throw if the given path doesn't exist", async () => {
      mockedDoesFileExist.mockResolvedValue(false);

      const expectedThrownMessage = `Cannot find the file: '${pathToPackageJson}'`;
      await expect(readPackageJson(pathToPackageJson)).rejects.toThrow(expectedThrownMessage);
    });

    it("should call readFileAsync with the package.json path if the given path does exist", async () => {
      mockedDoesFileExist.mockResolvedValue(true);

      await readPackageJson(pathToPackageJson);

      expect(mockedReadFileAsync).toBeCalledTimes(1);
      expect(mockedReadFileAsync).toHaveBeenCalledWith(pathToPackageJson, { encoding: "utf8" });
    });

    it("should return the json parsed result from readFileAsync", async () => {
      mockedDoesFileExist.mockResolvedValue(true);

      const result = await readPackageJson(pathToPackageJson);

      expect(result).toStrictEqual({
        name: "test-project",
        version: "1.2.3"
      });
    });
  });
});
