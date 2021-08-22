import * as main from "../src/main";
import consoleUtils from "../src/utils/console.utils";
import * as fileUtils from "../src/utils/file.utils";
import * as licenceUtils from "../src/utils/licence.utils";
import { Project } from "../src/utils/licence.utils";

class MockStream {
  allText: string = "";
  ended: boolean = false;

  once = jest.fn();
  write = jest.fn(text => {
    this.allText += text;
  });
  end = jest.fn(text => {
    this.allText += text;
    this.ended = true;
  });
}

describe("main", () => {
  let mockDoesFolderExist: jest.SpyInstance;

  let mockStream: MockStream;
  let mockCreateWriteStream: jest.SpyInstance;

  let subject: typeof main;

  beforeEach(() => {
    jest.spyOn(consoleUtils, "error").mockImplementation();

    mockDoesFolderExist = jest.spyOn(fileUtils, "doesFolderExist").mockImplementation();

    mockStream = new MockStream();

    mockCreateWriteStream = jest
      .spyOn(fileUtils, "createWriteStream")
      .mockImplementation()
      .mockReturnValue(mockStream as any);

    subject = require("../src/main");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("generateLicenseFile", () => {
    it("should write the found licences to the given file name", async () => {
      mockDoesFolderExist.mockReturnValue(Promise.resolve(true));

      const mockProject: Project = {
        lib1: { licenseFile: "./lib1/LICENSE.md" },
        lib2: { licenseFile: "./lib2/LICENSE.md" },
        lib3: { licenseFile: "./lib3/LICENSE.md" }
      };

      jest.spyOn(licenceUtils, "getProject").mockImplementation(() => Promise.resolve(mockProject));
      jest.spyOn(fileUtils, "doesFileExist").mockImplementation(() => Promise.resolve(true));
      jest
        .spyOn(fileUtils, "readFileAsync")
        .mockImplementationOnce(() => Promise.resolve("licence content"))
        .mockImplementationOnce(() => Promise.resolve("different licence content"))
        .mockImplementationOnce(() => Promise.resolve("licence content"));

      await subject.generateLicenseFile("../", "output.txt");

      expect(mockStream.once).toHaveBeenCalledTimes(1);
      const onceCallback = mockStream.once.mock.calls[0][1];
      onceCallback();

      expect(mockStream.allText).toMatchSnapshot();
      expect(mockCreateWriteStream.mock.calls[0][0]).toBe("output.txt");
      expect(mockStream.ended).toBe(true);
    });
  });

  describe("getProjectLicenses", () => {
    it("should throw if the given directory cannot be found", async () => {
      mockDoesFolderExist.mockReturnValue(Promise.resolve(false));

      try {
        await subject.getProjectLicenses("../");
        fail("should have thrown");
      } catch (e) {
        expect(e).toBe(undefined);
      }

      expect(consoleUtils.error).toHaveBeenCalledWith("Cannot find directory ../");
      expect(mockDoesFolderExist).toHaveBeenCalledWith("../");
    });

    it("should read in the license file for a dependency if it exists", async () => {
      mockDoesFolderExist.mockReturnValue(Promise.resolve(true));

      const mockProject: Project = {
        lib1: { licenseFile: "./lib1/LICENSE.md" },
        lib2: { licenseFile: "./lib2/LICENSE.md" },
        lib3: { licenseFile: "./lib3/LICENSE.md" }
      };

      jest.spyOn(licenceUtils, "getProject").mockImplementation(() => Promise.resolve(mockProject));
      jest.spyOn(fileUtils, "doesFileExist").mockImplementation(() => Promise.resolve(true));
      jest.spyOn(fileUtils, "readFileAsync").mockImplementation(() => Promise.resolve(""));

      await subject.getProjectLicenses("../");

      expect(fileUtils.doesFileExist).toHaveBeenCalledWith("./lib1/LICENSE.md");
      expect(fileUtils.doesFileExist).toHaveBeenCalledWith("./lib2/LICENSE.md");
      expect(fileUtils.doesFileExist).toHaveBeenCalledWith("./lib3/LICENSE.md");

      expect(fileUtils.readFileAsync).toHaveBeenCalledWith("./lib1/LICENSE.md", {
        encoding: "utf-8"
      });
      expect(fileUtils.readFileAsync).toHaveBeenCalledWith("./lib2/LICENSE.md", {
        encoding: "utf-8"
      });
      expect(fileUtils.readFileAsync).toHaveBeenCalledWith("./lib3/LICENSE.md", {
        encoding: "utf-8"
      });
    });

    it("should return all dependencies for a licence", async () => {
      mockDoesFolderExist.mockReturnValue(Promise.resolve(true));

      const mockProject: Project = {
        lib1: { licenseFile: "./lib1/LICENSE.md" },
        lib2: { licenseFile: "./lib2/LICENSE.md" },
        lib3: { licenseFile: "./lib3/LICENSE.md" }
      };

      jest.spyOn(licenceUtils, "getProject").mockImplementation(() => Promise.resolve(mockProject));
      jest.spyOn(fileUtils, "doesFileExist").mockImplementation(() => Promise.resolve(true));
      jest
        .spyOn(fileUtils, "readFileAsync")
        .mockImplementation(() => Promise.resolve("licence content"));

      const result = await subject.getProjectLicenses("../");

      expect(result).toEqual([
        { content: "licence content", dependencies: ["lib1", "lib2", "lib3"] }
      ]);
    });

    it("should group dependencies by their licence", async () => {
      mockDoesFolderExist.mockReturnValue(Promise.resolve(true));

      const mockProject: Project = {
        lib1: { licenseFile: "./lib1/LICENSE.md" },
        lib2: { licenseFile: "./lib2/LICENSE.md" },
        lib3: { licenseFile: "./lib3/LICENSE.md" }
      };

      jest.spyOn(licenceUtils, "getProject").mockImplementation(() => Promise.resolve(mockProject));
      jest.spyOn(fileUtils, "doesFileExist").mockImplementation(() => Promise.resolve(true));
      jest
        .spyOn(fileUtils, "readFileAsync")
        .mockImplementationOnce(() => Promise.resolve("licence content"))
        .mockImplementationOnce(() => Promise.resolve("different licence content"))
        .mockImplementationOnce(() => Promise.resolve("licence content"));

      const result = await subject.getProjectLicenses("../");

      expect(result).toEqual([
        { content: "licence content", dependencies: ["lib1", "lib3"] },
        { content: "different licence content", dependencies: ["lib2"] }
      ]);
    });
  });
});
