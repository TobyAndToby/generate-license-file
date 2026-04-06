import {
  expandExcludes,
  RegexExclude,
  StringExclude,
} from "../../../src/lib/internal/resolveDependencies/expandExcludes";
import { PackageJson } from "../../../src/lib/utils/packageJson.utils";

describe("expandExcludes", () => {
  describe("expandExcludes function", () => {
    it("should return empty array when patterns is undefined", () => {
      const result = expandExcludes(undefined);
      expect(result).toEqual([]);
    });

    it("should return empty array when patterns is empty", () => {
      const result = expandExcludes([]);
      expect(result).toEqual([]);
    });

    it("should create StringExclude instances for normal strings", () => {
      const patterns = ["lodash", "@types/node", "express"];
      const result = expandExcludes(patterns);

      expect(result).toHaveLength(3);
      expect(result[0]).toBeInstanceOf(StringExclude);
      expect(result[1]).toBeInstanceOf(StringExclude);
      expect(result[2]).toBeInstanceOf(StringExclude);
    });

    it("should create RegexExclude instances for regex patterns", () => {
      const patterns = ["/^@types/", "/lodash.*/", "/express$/gi"];
      const result = expandExcludes(patterns);

      expect(result).toHaveLength(3);
      expect(result[0]).toBeInstanceOf(RegexExclude);
      expect(result[1]).toBeInstanceOf(RegexExclude);
      expect(result[2]).toBeInstanceOf(RegexExclude);
    });

    it("should create mixed instances for mixed patterns", () => {
      const patterns = ["lodash", "/^@types/", "express", "/test$/i"];
      const result = expandExcludes(patterns);

      expect(result).toHaveLength(4);
      expect(result[0]).toBeInstanceOf(StringExclude);
      expect(result[1]).toBeInstanceOf(RegexExclude);
      expect(result[2]).toBeInstanceOf(StringExclude);
      expect(result[3]).toBeInstanceOf(RegexExclude);
    });
  });

  describe("StringExclude", () => {
    const mockPackageJson = new PackageJson("lodash", "4.17.21", "MIT");

    it("should match by package name", () => {
      const exclude = new StringExclude("lodash");
      expect(exclude.match(mockPackageJson)).toBe(true);
    });

    it("should match by package identifier", () => {
      const exclude = new StringExclude("lodash@4.17.21");
      expect(exclude.match(mockPackageJson)).toBe(true);
    });

    it("should not match when neither name nor identifier matches", () => {
      const exclude = new StringExclude("express");
      expect(exclude.match(mockPackageJson)).toBe(false);
    });

    it("should not match partial strings", () => {
      const exclude = new StringExclude("lod");
      expect(exclude.match(mockPackageJson)).toBe(false);
    });
  });

  describe("RegexExclude", () => {
    const mockPackageJson = new PackageJson("@types/node", "18.15.0", "MIT");

    it("should match package identifier with regex pattern", () => {
      const exclude = new RegexExclude("^@types/", "");
      expect(exclude.match(mockPackageJson)).toBe(true);
    });

    it("should match with case-insensitive flag", () => {
      const exclude = new RegexExclude("NODE", "i");
      expect(exclude.match(mockPackageJson)).toBe(true);
    });

    it("should match with global flag", () => {
      const exclude = new RegexExclude("node", "gi");
      expect(exclude.match(mockPackageJson)).toBe(true);
    });

    it("should not match when regex does not match", () => {
      const exclude = new RegexExclude("^express", "");
      expect(exclude.match(mockPackageJson)).toBe(false);
    });

    it("should match end of string with $ anchor", () => {
      const exclude = new RegexExclude("18\\.15\\.0$", "");
      expect(exclude.match(mockPackageJson)).toBe(true);
    });

    it("should handle complex regex patterns", () => {
      const exclude = new RegexExclude("@types/.*node.*", "i");
      expect(exclude.match(mockPackageJson)).toBe(true);
    });
  });
});
