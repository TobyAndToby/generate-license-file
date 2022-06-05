import { allLineEndings, getLineEndingValue, LineEnding } from "../../src/lineEndings";
import { getLicenseFileText } from "../../src/main";
import { describeEachLineEnding } from "../describes/lineEndings";
import { describeAllTestPackagesAtOnce, describeEachTestPackage } from "../describes/testPackages";

describe("getLicenseFileText", () => {
  describeEachTestPackage(packageJsonUnderTest =>
    describeEachLineEnding(lineEnding => {
      let lineEndingsNotUnderTest: LineEnding[] = [];

      beforeEach(() => {
        lineEndingsNotUnderTest = allLineEndings.filter(x => x !== lineEnding);
      });

      it("should match snapshot", async () => {
        const result = await getLicenseFileText(packageJsonUnderTest, lineEnding);

        expect(result).toMatchSnapshot();
      });

      it("should contain the correct line ending value", async () => {
        const expectedLineEndingValue = getLineEndingValue(lineEnding);

        const result = await getLicenseFileText(packageJsonUnderTest, lineEnding);

        expect(result).toContain(expectedLineEndingValue);
      });

      lineEndingsNotUnderTest.forEach(otherLineEnding =>
        it(`should not contain the incorrect line ending value (${otherLineEnding})`, async () => {
          const incorrectLineEndingValue = getLineEndingValue(otherLineEnding);

          const result = await getLicenseFileText(packageJsonUnderTest, lineEnding);

          expect(result).not.toContain(incorrectLineEndingValue);
        })
      );
    })
  );

  describeAllTestPackagesAtOnce(packageJsonsUnderTest => {
    it("should match snapshot", async () => {
      const result = await getLicenseFileText(packageJsonsUnderTest);

      expect(result).toMatchSnapshot();
    });
  });
});
