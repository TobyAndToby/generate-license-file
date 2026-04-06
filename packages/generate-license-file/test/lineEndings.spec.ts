import os from "node:os";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { getLineEndingCharacters, isLineEnding } from "../src/lib/lineEndings";

const mockSystemEOL = "EOL";

vi.mock("os");

describe("lineEndings", () => {
  const mockedOs = vi.mocked(os);

  beforeEach(() => {
    vi.resetAllMocks();
    mockedOs.EOL = mockSystemEOL;
  });

  afterAll(vi.restoreAllMocks);

  describe("isLineEnding", () => {
    it("should return true for 'crlf'", () => {
      const result = isLineEnding("crlf");

      expect(result).toBe(true);
    });

    it("should return true for 'lf'", () => {
      const result = isLineEnding("lf");

      expect(result).toBe(true);
    });

    it("should return false for null", () => {
      const result = isLineEnding(null);

      expect(result).toBe(false);
    });

    it("should return false for undefined", () => {
      const result = isLineEnding(undefined);

      expect(result).toBe(false);
    });

    it("should return false for the line ending value '\\r\\n'", () => {
      const result = isLineEnding("\r\n");

      expect(result).toBe(false);
    });

    it("should return false for the line ending value '\\n'", () => {
      const result = isLineEnding("\n");

      expect(result).toBe(false);
    });

    ["foo", "bar"].forEach((value) => {
      it(`should return false for unknown values (${value})`, () => {
        const result = isLineEnding(value);

        expect(result).toBe(false);
      });
    });
  });

  describe("getLineEndingCharacters", () => {
    it("should return the system EOL when given undefined", () => {
      const result = getLineEndingCharacters(undefined);

      expect(result).toBe(mockSystemEOL);
    });

    it("should return '\\r\\n' when given 'crlf'", () => {
      const result = getLineEndingCharacters("crlf");

      expect(result).toBe("\r\n");
    });

    it("should return '\\n' when given 'lf'", () => {
      const result = getLineEndingCharacters("lf");

      expect(result).toBe("\n");
    });
  });
});
