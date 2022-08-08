import { describeEachTestPackage } from "@generate-license-file/e2e-shared";
import { getProjectLicenses } from "generate-license-file";

describe("getProjectLicenses", () => {
  describeEachTestPackage(packageJsonUnderTest => {
    it("should match snapshot", async () => {
      const result = await getProjectLicenses(packageJsonUnderTest);

      expect(result).toMatchSnapshot();
    });
  });
});
