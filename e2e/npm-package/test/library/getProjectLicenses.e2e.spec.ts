import { describeRelativeAndAbsolutePaths } from "@generate-license-file/e2e-helpers";
import { getProjectLicenses, type ILicense } from "generate-license-file";
import { describe, expect, it } from "vitest";

const sortLicenses = (licenses: ILicense[]) =>
  licenses
    .map(l => ({ ...l, dependencies: [...l.dependencies].sort() }))
    .sort((a, b) => a.dependencies[0].localeCompare(b.dependencies[0]));

describe("getProjectLicenses", () => {
  describeRelativeAndAbsolutePaths("./package.json", packageJsonPath => {
    it("should match snapshot", async () => {
      const result = await getProjectLicenses(packageJsonPath);

      expect(sortLicenses(result)).toMatchSnapshot();
    });
  });

  it("should not include versions when omitVersions is true", async () => {
    const result = await getProjectLicenses("./package.json", {
      omitVersions: true,
    });

    expect(sortLicenses(result)).toMatchSnapshot();
  });
});
