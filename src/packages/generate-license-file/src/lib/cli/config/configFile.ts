import { Options as CosmiconfigOptions, cosmiconfig } from "cosmiconfig";
import { json5Parse } from "./parsers/json5";

export type ConfigFile = { path: string; config: unknown };

export const loadConfig = async (filePath: string): Promise<ConfigFile | undefined> => {
  const options: CosmiconfigOptions = {
    loaders: {
      ".json": json5Parse,
      ".jsonc": json5Parse,
      ".json5": json5Parse,
    },
  };

  const explorer = cosmiconfig("generate-license-file", options);
  const result = await explorer.load(filePath);

  if (result !== null && !result?.isEmpty) {
    return {
      path: result.filepath,
      config: result.config,
    };
  }

  return;
};

const moduleNames = ["glf", "glfrc", "generatelicensefile", "generatelicensefilerc"];

const generateSearchPlaces = (moduleName: string): string[] => [
  `.${moduleName}`,
  `.${moduleName}.json`,
  `.${moduleName}.jsonc`,
  `.${moduleName}.json5`,
  `.${moduleName}.yaml`,
  `.${moduleName}.yml`,
  `.${moduleName}.js`,
  `.${moduleName}.cjs`,
  `.config/${moduleName}`,
  `.config/${moduleName}.json`,
  `.config/${moduleName}.jsonc`,
  `.config/${moduleName}.json5`,
  `.config/${moduleName}.yaml`,
  `.config/${moduleName}.yml`,
  `.config/${moduleName}.js`,
  `.config/${moduleName}.cjs`,
  `${moduleName}.config.js`,
  `${moduleName}.config.cjs`,
];

const searchPlaces: string[] = ["package.json"];

for (const moduleName of moduleNames) {
  searchPlaces.push(...generateSearchPlaces(moduleName));
}

export const findConfig = async (directory: string): Promise<ConfigFile | undefined> => {
  const options: CosmiconfigOptions = {
    stopDir: directory,
    loaders: {
      ".json": json5Parse,
      ".jsonc": json5Parse,
      ".json5": json5Parse,
    },
    searchPlaces,
  };

  const explorer = cosmiconfig("generate-license-file", options);
  const result = await explorer.search(directory);

  if (result !== null && !result?.isEmpty) {
    return {
      path: result.filepath,
      config: result.config,
    };
  }

  return;
};
