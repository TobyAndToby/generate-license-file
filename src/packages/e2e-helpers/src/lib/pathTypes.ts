import path from "path";

type DescribeCallback = (packageJsonPath: string) => void;

export const describeRelativeAndAbsolutePaths = (
  relativePackageJsonPath: string,
  callback: DescribeCallback,
) => {
  describe("for a relative path", () => {
    callback(relativePackageJsonPath);
  });

  const absolutePackageJsonPath = path.join(process.cwd(), relativePackageJsonPath);

  describe("for an absolute path", () => {
    callback(absolutePackageJsonPath);
  });
};
