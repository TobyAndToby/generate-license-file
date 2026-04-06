import { describeEachLineEnding, describeRelativeAndAbsolutePaths } from "@generate-license-file/e2e-helpers";
import type { LineEnding } from "generate-license-file";
import { getLicenseFileText } from "generate-license-file";
import { beforeEach, describe, expect, it } from "vitest";

const allLineEndings: LineEnding[] = ["crlf", "lf"];

describe("getLicenseFileText", () => {
  describeRelativeAndAbsolutePaths("./package.json", (packageJsonPath) =>
    describeEachLineEnding((lineEnding, lineEndingLiteral) => {
      let lineEndingsNotUnderTest: LineEnding[] = [];

      beforeEach(() => {
        lineEndingsNotUnderTest = allLineEndings.filter((x) => x !== lineEnding);
      });

      it("should match snapshot", async () => {
        const result = await getLicenseFileText(packageJsonPath, {
          lineEnding,
        });

        expect(result).toMatchSnapshot();
      });

      it("should contain the correct line ending value", async () => {
        const expectedLineEndingValue = lineEndingLiteral;

        const result = await getLicenseFileText(packageJsonPath, {
          lineEnding,
        });

        expect(result).toContain(expectedLineEndingValue);
      });

      for (const otherLineEnding of lineEndingsNotUnderTest) {
        it(`should not contain the incorrect line ending value (${otherLineEnding})`, async () => {
          const incorrectLineEndingValue = lineEndingLiteral;

          const result = await getLicenseFileText(packageJsonPath, {
            lineEnding,
          });

          expect(result).not.toContain(incorrectLineEndingValue);
        });
      }
    }),
  );

  it("should omit versions when omitVersions is true", async () => {
    const result = await getLicenseFileText("./package.json", {
      omitVersions: true,
    });

    expect(result).toMatchSnapshot();
  });
});
