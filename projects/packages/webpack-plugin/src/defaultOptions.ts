import { Options } from "./options";

export const defaultOptions: Options = {
  outputFileName: "third-party-licenses.txt",
  outputFolder: "./",
  pathToPackageJson: "./package.json",
  isDev: false,
  lineEnding: undefined
};
