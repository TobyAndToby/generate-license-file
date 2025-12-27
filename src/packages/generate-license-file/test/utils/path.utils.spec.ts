import { join } from "path/posix";
import { doesFolderExist } from "../../src/lib/utils/file.utils";
import { resolveNodeModulesPath } from "../../src/lib/utils/path.utils";

jest.mock("../../src/lib/utils/file.utils", () => ({
  doesFolderExist: jest.fn(),
}));

describe("path.utils", () => {
  const mockDoesFolderExist = jest.mocked(doesFolderExist);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("resolveNodeModulesPath", () => {
    it("should return the directory it is given with a node_modules suffix when it contains node_modules", async () => {
      const start = "/this/is/a/test/path";
      const expected = join(start, "node_modules");

      mockDoesFolderExist.mockImplementation(async () => true);

      const result = await resolveNodeModulesPath(start);

      expect(result).toBe(expected);
      expect(doesFolderExist).toHaveBeenCalledWith(expected);
    });

    it("returns a parent directory with a node_modules suffix when that contains node_modules", async () => {
      const start = "/this/is/a/test/path";
      const expected = "/this/is/node_modules";

      mockDoesFolderExist.mockImplementation(async p => p === expected);

      const result = await resolveNodeModulesPath(start);

      expect(result).toBe(expected);
      expect(doesFolderExist).toHaveBeenCalledWith(expected);
    });

    it("throws when node_modules cannot be found up to filesystem root", async () => {
      const start = "/this/is/a/test/path";

      mockDoesFolderExist.mockResolvedValue(false);

      await expect(resolveNodeModulesPath(start)).rejects.toThrow(
        /Could not find node_modules directory starting from/i,
      );
    });
  });
});
