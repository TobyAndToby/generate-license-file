import path from "path";

export const testPackageJsonPaths = [
  "all-have-licenses/package.json",
  "missing-license-file/package.json",
];

type DescribeEachTestPackageCallback = (packageJsonPath: string, isAbsolute: boolean) => void;

export const describeEachTestPackage = (callback: DescribeEachTestPackageCallback) => {
  testPackageJsonPaths.forEach(testPackage => {
    const absolutePackageJson = path.join(process.cwd(), "../e2e-dependencies", testPackage);
    describe(`for package ${testPackage} with an absolute path`, () => {
      callback(absolutePackageJson, true);
    });

    const relativePackageJson = path.join("../e2e-dependencies", testPackage);
    describe(`for package ${testPackage} with a relative path`, () => {
      callback(relativePackageJson, false);
    });
  });
};
