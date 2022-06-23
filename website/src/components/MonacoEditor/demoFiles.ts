import { Language } from "prism-react-renderer";

export type MonacoEditorFile = {
  fileName: string;
  language: Language;
  content: string;
};

export const demoFiles: MonacoEditorFile[] = [
  {
    fileName: "library-demo.ts",
    // Intentionally set to "javascript", the "typescript" lang setting doesn't
    // appear to set correct classes on imports or non-native types.
    language: "javascript",
    content: `import { getProjectLicenses, ILicense } from "generate-license-file";

// Get an array of licenses for the current project's production dependencies.
const licenses: ILicense[] = await getProjectLicenses("./package.json");
    `
  },
  {
    fileName: "library-demo.js",
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
  });
    `
  }
];
