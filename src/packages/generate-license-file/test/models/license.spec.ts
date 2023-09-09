import { getLineEndingCharacters, lineEndings } from "../../src/lib/lineEndings";
import { License } from "../../src/lib/models/license";

describe("License", () => {
  const dependency1 = "dependency #1";
  const dependency2 = "dependency #2";
  const dependency3 = "dependency #3";
  const dependency4 = "dependency #4";

  const dependencies = [dependency1, dependency2, dependency3, dependency4];

  describe("format", () => {
    const prefix = "The following npm packages may be included in this product:";

    it("should prefix the license", () => {
      const license = new License("", []);

      const result = license.format("\n");

      expect(result.startsWith(prefix)).toBeTruthy();
    });

    it.each(lineEndings)("should use the %s line ending twice after the prefix", lineEnding => {
      const eol = getLineEndingCharacters(lineEnding);

      const license = new License("", []);

      const result = license.format(eol);
      const resultWithoutPrefix = result.substring(prefix.length);

      expect(resultWithoutPrefix.startsWith(eol + eol)).toBeTruthy();
    });

    it("should list all of the dependencies", () => {
      const license = new License("", dependencies);

      const result = license.format("\n");
      const resultLines = result.split("\n");

      expect(resultLines[2]).toEqual(" - " + dependency1);
      expect(resultLines[3]).toEqual(" - " + dependency2);
      expect(resultLines[4]).toEqual(" - " + dependency3);
      expect(resultLines[5]).toEqual(" - " + dependency4);
    });

    it.each(lineEndings)(
      "should use the %s line ending twice after the dependencies",
      lineEnding => {
        const eol = getLineEndingCharacters(lineEnding);

        const lastDep = "last dep";
        const lastDepOnly = [lastDep];
        const license = new License("", lastDepOnly);

        const result = license.format(eol);
        const indexOfLastDependency = result.lastIndexOf(lastDep);

        const resultWithoutDependencies = result.substring(indexOfLastDependency + lastDep.length);
        expect(resultWithoutDependencies.startsWith(eol + eol)).toBeTruthy();
      },
    );

    it("should end with the license content", () => {
      const theLicenseContent = "The license content";

      const license = new License(theLicenseContent, dependencies);

      const result = license.format("\n");

      expect(result.endsWith(theLicenseContent)).toBeTruthy();
    });

    it.each(lineEndings)(
      "should normalise the line endings in the license content to %s",
      lineEnding => {
        const eol = getLineEndingCharacters(lineEnding);

        const originalLicenseContent = `The\rlicense\nfile\r\ncontent`;
        const expectedLicenseContent = `The${eol}license${eol}file${eol}content`;

        const license = new License(originalLicenseContent, dependencies);

        const result = license.format(eol);

        expect(result.endsWith(expectedLicenseContent)).toBeTruthy();
      },
    );
  });
});
