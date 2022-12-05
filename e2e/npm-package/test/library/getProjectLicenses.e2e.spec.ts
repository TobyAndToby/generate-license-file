import {
  describeEachLineEnding,
  describeRelativeAndAbsolutePaths,
} from "@generate-license-file/e2e-helpers";
import { getProjectLicenses } from "generate-license-file";

describe("getProjectLicenses", () => {
  describeRelativeAndAbsolutePaths("./package.json", (packageJsonPath) => {
    it("should match snapshot", async () => {
      const result = await getProjectLicenses(packageJsonPath);

      expect(result).toMatchSnapshot();
    });
  });
});
