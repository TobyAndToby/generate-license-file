export const printPackageVersion = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version } = require("../../package.json");

  console.log(`v${version}`);
};
