import { getProjectLicenses } from "../../src/main";
import { getAbsoluteTestPackageJson } from "../cli/utils";
import { testPackageJsons } from "../test-projects";

describe("main", () => {
  describe("getProjectLicenses", () => {
    testPackageJsons.forEach(packageJsonUnderTest =>
      it(`should match snapshot for: ${packageJsonUnderTest}`, async () => {
        const absolutePackageJson = getAbsoluteTestPackageJson(packageJsonUnderTest);

        const result = await getProjectLicenses(absolutePackageJson);

        expect(result).toMatchSnapshot();
      })
    );
  });
});
