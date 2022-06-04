import path from "path";

export const testPackageJsons = [
  "all-have-licenses/package.json",
  "missing-license-file/package.json"
];

type DescribeEachTestPackageCallback = (packageJsonPath: string, isAbsolute: boolean) => void;

export const describeEachTestPackage = (callback: DescribeEachTestPackageCallback) => {
  testPackageJsons.forEach(testPackage => {
    const absolutePackageJson = path.join(__dirname, "../testProjects", testPackage);
    describe(`for package ${testPackage} with an absolute path`, () => {
      callback(absolutePackageJson, true);
    });

    const relativePackageJson = path.join("./e2e/testProjects", testPackage);
    describe(`for package ${testPackage} with a relative path`, () => {
      callback(relativePackageJson, false);
    });
  });
};
