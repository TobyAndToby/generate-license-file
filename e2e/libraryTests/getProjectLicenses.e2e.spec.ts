import { getProjectLicenses } from "../../src/main";
import { describeEachTestPackage } from "../describes/testPackages";

describe("getProjectLicenses", () => {
  describeEachTestPackage(packageJsonUnderTest => {
    it("should match snapshot", async () => {
      const result = await getProjectLicenses(packageJsonUnderTest);

      expect(result).toMatchSnapshot();
    });
  });
});
