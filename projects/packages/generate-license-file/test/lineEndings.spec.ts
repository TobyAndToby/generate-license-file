import os from "os";
import { getLineEndingValue, isLineEnding, LineEnding } from "../src/lineEndings";

const mockSystemEOL = "EOL";

jest.mock("os");

describe("lineEndings", () => {
  const mockedOs = jest.mocked(os);

  beforeEach(() => {
    jest.resetAllMocks();
    mockedOs.EOL = mockSystemEOL;
  });

  afterAll(() => jest.restoreAllMocks());

  describe("isLineEnding", () => {
    it("should return true for undefined", () => {
      const result = isLineEnding(undefined);

      expect(result).toBe(true);
    });

    it("should return true for 'crlf'", () => {
      const result = isLineEnding("crlf");

      expect(result).toBe(true);
    });

    it("should return true for 'lf'", () => {
      const result = isLineEnding("lf");

      expect(result).toBe(true);
    });

    it("should return false for null", () => {
      const result = isLineEnding(null as unknown as string);

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

    ["foo", "bar"].forEach(value =>
      it(`should return false for unknown values (${value})`, () => {
        const result = isLineEnding(value);

        expect(result).toBe(false);
      })
    );
  });

  describe("getLineEndingValue", () => {
    it("should return the system EOL when given undefined", () => {
      const result = getLineEndingValue(undefined);

      expect(result).toBe(mockSystemEOL);
    });

    it("should return '\\r\\n' when given 'crlf'", () => {
      const result = getLineEndingValue("crlf");

      expect(result).toBe("\r\n");
    });

    it("should return '\\n' when given 'lf'", () => {
      const result = getLineEndingValue("lf");

      expect(result).toBe("\n");
    });

    ["foo", "bar"].forEach(value =>
      it("should throw an error when given an unknown value", () => {
        expect(() => getLineEndingValue(value as unknown as LineEnding)).toThrow(
          `Unknown line ending value: ${value}`
        );
      })
    );
  });
});
