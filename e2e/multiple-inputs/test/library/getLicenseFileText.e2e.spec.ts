import { getLicenseFileText } from "generate-license-file";

describe("getLicenseFileText", () => {
  it("should match snapshot", async () => {
    const inputPaths = ["./package.json", "./../npm-package/package.json"];

    const result = await getLicenseFileText(inputPaths);

    expect(result).toMatchSnapshot();
  });
});
