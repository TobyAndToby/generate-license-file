import { getProjectLicenses } from "../../src/main";
import { describeAllTestPackagesAtOnce, describeEachTestPackage } from "../describes/testPackages";

describe("getProjectLicenses", () => {
  describeEachTestPackage(packageJsonUnderTest => {
    it("should match snapshot", async () => {
      const result = await getProjectLicenses(packageJsonUnderTest);

      expect(result).toMatchSnapshot();
    });
  });

  describeAllTestPackagesAtOnce(packageJsonsUnderTest => {
    it("should match snapshot", async () => {
      const result = await getProjectLicenses(packageJsonsUnderTest);

      expect(result).toMatchSnapshot();
    });
  });
});
