import { Language } from "prism-react-renderer";

export type MonacoEditorFile = {
  fileName: string;
  tabIcon: string;
  language: Language;
  content: string;
};

export const demoFiles: MonacoEditorFile[] = [
  {
    fileName: "demo.ts",
    tabIcon: "/img/ts-logo-256.png",
    // Intentionally set to "javascript", the "typescript" lang setting doesn't
    // appear to set correct classes on imports or non-native types.
    language: "javascript",
    content: `import { getProjectLicenses, ILicense } from "generate-license-file";

// Get an array of licenses for the current project's production dependencies.
const licenses: ILicense[] = await getProjectLicenses("./package.json");
    `,
  },
  {
    fileName: "demo.js",
    tabIcon: "/img/js-logo-256.png",
    language: "javascript",
    content: `const generateLicenseFile = require("generate-license-file");

// Get an array of licenses for the current project's production dependencies.
generateLicenseFile
  .getProjectLicenses("./package.json")
  .then(licenses => {
    // Do stuff with licenses...
  })
  .catch(error => {
    // Do stuff with error...
  });`,
  },
];
