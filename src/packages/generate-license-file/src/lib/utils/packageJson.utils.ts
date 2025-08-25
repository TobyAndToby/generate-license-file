import { doesFileExist, readFile } from "./file.utils";

export class PackageJson {
  private _identifier: string | undefined;

  constructor(
    public readonly name?: string,
    public readonly version?: string,
    public readonly license?: string | PackageJsonLicense | PackageJsonLicense[],
    public readonly licenses?: PackageJsonLicense[],
  ) {}

  public get identifier(): string {
    return (this._identifier ??= `${this.name ?? "unknown"}@${this.version ?? "unknown"}`);
  }
}

export interface PackageJsonLicense {
  type?: string;
  url?: string;
}

export const readPackageJson = async (pathToPackageJson: string): Promise<PackageJson> => {
  const doesPackageJsonExist = await doesFileExist(pathToPackageJson);
  if (!doesPackageJsonExist) {
    throw new Error(`Cannot find the file: '${pathToPackageJson}'`);
  }

  const packageJsonAsString: string = await readFile(pathToPackageJson, { encoding: "utf-8" });
  const packageJsonData = JSON.parse(packageJsonAsString);

  return new PackageJson(
    packageJsonData.name,
    packageJsonData.version,
    packageJsonData.license,
    packageJsonData.licenses,
  );
};
