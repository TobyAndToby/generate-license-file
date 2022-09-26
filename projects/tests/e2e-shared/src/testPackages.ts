import path from "path";

export const testPackageJsonPaths = ["project-1/package.json"];

type DescribeEachTestPackageCallback = (packageJsonPath: string, isAbsolute: boolean) => void;

export const describeEachTestPackage = (callback: DescribeEachTestPackageCallback) => {
  testPackageJsonPaths.forEach(testPackage => {
    const absolutePackageJson = path.join(process.cwd(), "../e2e-projects", testPackage);
    describe(`for package ${testPackage} with an absolute path`, () => {
      callback(absolutePackageJson, true);
    });

    const relativePackageJson = path.join("../e2e-projects", testPackage);
    describe(`for package ${testPackage} with a relative path`, () => {
      callback(relativePackageJson, false);
    });
  });
};
