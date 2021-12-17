import { License } from "../../src/models/license";

describe("License", () => {
  const dependency1 = "dependency #1";
  const dependency2 = "dependency #2";
  const dependency3 = "dependency #3";
  const dependency4 = "dependency #4";

  const dependencies = [dependency1, dependency2, dependency3, dependency4];

  describe("format", () => {
    const prefix = "The following NPM packages may be included in this product:";

    it("should prefix the license", () => {
      const license = new License("", []);

      const result = license.format("\n");

      expect(result.startsWith(prefix)).toBeTruthy();
    });

    ["lf", "clrf"].forEach(lineBreak =>
      it(`should use the line break twice after the prefix (${lineBreak})`, () => {
        const license = new License("", []);

        const result = license.format(lineBreak);
        const resultWithoutPrefix = result.substr(prefix.length);

        expect(resultWithoutPrefix.startsWith(lineBreak + lineBreak)).toBeTruthy();
      })
    );

    it("should list all of the dependencies", () => {
      const license = new License("", dependencies);

      const result = license.format("|");
      const resultLines = result.split("|");

      expect(resultLines[2]).toEqual(" - " + dependency1);
      expect(resultLines[3]).toEqual(" - " + dependency2);
      expect(resultLines[4]).toEqual(" - " + dependency3);
      expect(resultLines[5]).toEqual(" - " + dependency4);
    });

    ["lf", "clrf"].forEach(lineBreak =>
      it(`should use the line break twice after the dependencies (${lineBreak})`, () => {
        const lastDep = "last dep";
        const lastDepOnly = [lastDep];
        const license = new License("", lastDepOnly);

        const result = license.format(lineBreak);
        const indexOfLastDependency = result.lastIndexOf(lastDep);

        const resultWithoutDependencies = result.substr(indexOfLastDependency + lastDep.length);
        expect(resultWithoutDependencies.startsWith(lineBreak + lineBreak)).toBeTruthy();
      })
    );

    it("should end with the license content", () => {
      const theLicenseContent = "The license content";

      const license = new License(theLicenseContent, dependencies);

      const result = license.format("|");

      expect(result.endsWith(theLicenseContent)).toBeTruthy();
    });
  });
});
