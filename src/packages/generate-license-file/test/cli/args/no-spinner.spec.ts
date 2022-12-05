import { Result } from "arg";
import { NoSpinner } from "../../../src/lib/cli/args/no-spinner";
import { ArgumentsWithAliases } from "../../../src/lib/cli/cli-arguments";

describe("NoSpinner", () => {
  describe("resolve", () => {
    [
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
    ].forEach(({ input, expected }) =>
      it(`should return ${expected} when the --no-spinner arg is ${input}`, async () => {
        const noSpinner = new NoSpinner();

        const args = {
          "--no-spinner": input,
        } as Result<ArgumentsWithAliases>;

        const result = await noSpinner.resolve(args);
        return expect(result).toBe(expected);
      }),
    );

    it(`should return false when the --no-spinner arg is not given`, async () => {
      const noSpinner = new NoSpinner();

      const args = {} as Result<ArgumentsWithAliases>;

      const result = await noSpinner.resolve(args);
      return expect(result).toBe(false);
    });
  });

  describe("parse", () => {
    [
      { input: true, expected: true },
      { input: false, expected: false },
      { input: undefined, expected: false },
      { input: null, expected: false },
    ].forEach(({ input, expected }) =>
      it(`should return ${expected} when the --no-spinner arg is ${input}`, async () => {
        const noSpinner = new NoSpinner();

        const args = {
          "--no-spinner": input,
        } as Result<ArgumentsWithAliases>;

        const result = await noSpinner.parse(args);
        return expect(result).toBe(expected);
      }),
    );

    it(`should return false when the --no-spinner arg is not given`, async () => {
      const noSpinner = new NoSpinner();

      const args = {} as Result<ArgumentsWithAliases>;

      const result = await noSpinner.parse(args);
      return expect(result).toBe(false);
    });
  });
});
