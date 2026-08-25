import { join } from "node:path/posix";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { doesFolderExist } from "../../src/lib/utils/file.utils";
import { resolveNodeModulesPath } from "../../src/lib/utils/path.utils";

vi.mock("../../src/lib/utils/file.utils", () => ({
  doesFolderExist: vi.fn(),
}));

describe("path.utils", () => {
  const mockDoesFolderExist = vi.mocked(doesFolderExist);

  beforeEach(() => {
    vi.resetAllMocks();
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

  // Regression test for https://github.com/TobyAndToby/generate-license-file/issues/754.
  //
  // resolveNodeModulesPath must parse paths using the platform-native "node:path" module,
  // because its callers (eg. resolveNpmDependencies.ts) build the paths it receives using
  // that same module - on a real Windows machine that means backslash-separated paths.
  // A previous version of this file hard-coded "node:path/posix", which silently swallowed
  // backslashes and broke the "walk up to find node_modules" logic on Windows. We fake a
  // Windows environment here (by mocking "node:path" to behave like "node:path/win32") so
  // this is caught on any host OS, not just when actually running the suite on Windows.
  describe("resolveNodeModulesPath on Windows", () => {
    beforeEach(() => {
      vi.resetModules();
      vi.doMock("node:path", async () => vi.importActual<typeof import("node:path/win32")>("node:path/win32"));
    });

    afterEach(() => {
      vi.doUnmock("node:path");
    });

    it("walks up parent directories using Windows path separators to find node_modules", async () => {
      const { doesFolderExist: doesFolderExistOnWindows } = await import("../../src/lib/utils/file.utils");
      const { resolveNodeModulesPath: resolveNodeModulesPathOnWindows } = await import(
        "../../src/lib/utils/path.utils"
      );

      const start = "C:\\this\\is\\a\\test\\path";
      const expected = "C:\\this\\is\\node_modules";

      vi.mocked(doesFolderExistOnWindows).mockImplementation(async p => p === expected);

      const result = await resolveNodeModulesPathOnWindows(start);

      expect(result).toBe(expected);
    });
  });
});
