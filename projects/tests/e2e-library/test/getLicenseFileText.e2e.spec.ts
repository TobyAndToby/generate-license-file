import { describeEachLineEnding, describeEachTestPackage } from "@generate-license-file/e2e-shared";
import { allLineEndings, getLicenseFileText, LineEnding } from "generate-license-file";

describe("getLicenseFileText", () => {
  describeEachTestPackage(packageJsonUnderTest =>
    describeEachLineEnding((lineEnding, lineEndingLiteral) => {
      let lineEndingsNotUnderTest: LineEnding[] = [];

      beforeEach(() => {
        lineEndingsNotUnderTest = allLineEndings.filter(x => x !== lineEnding);
      });

      it("should match snapshot", async () => {
        const result = await getLicenseFileText(packageJsonUnderTest, lineEnding);

        expect(result).toMatchSnapshot();
      });

      it("should contain the correct line ending value", async () => {
        const expectedLineEndingValue = lineEndingLiteral;

        const result = await getLicenseFileText(packageJsonUnderTest, lineEnding);

        expect(result).toContain(expectedLineEndingValue);
      });

      lineEndingsNotUnderTest.forEach(otherLineEnding =>
        it(`should not contain the incorrect line ending value (${otherLineEnding})`, async () => {
          const incorrectLineEndingValue = lineEndingLiteral;

          const result = await getLicenseFileText(packageJsonUnderTest, lineEnding);

          expect(result).not.toContain(incorrectLineEndingValue);
        }),
      );
    }),
  );
});
