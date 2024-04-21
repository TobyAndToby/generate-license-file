import { describeRelativeAndAbsolutePaths } from "@generate-license-file/e2e-helpers";
import { getProjectLicenses } from "generate-license-file";

describe("getProjectLicenses", () => {
  describeRelativeAndAbsolutePaths("./package.json", (packageJsonPath) => {
    it("should match snapshot", async () => {
      const result = await getProjectLicenses(packageJsonPath);

      expect(result).toMatchSnapshot();
    });
  });

  it("should not include versions when omitVersions is true", async () => {
    const result = await getProjectLicenses("./package.json", {
      omitVersions: true,
    });

    expect(result).toMatchSnapshot();
  });
});
