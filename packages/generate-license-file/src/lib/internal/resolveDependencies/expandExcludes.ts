import { PackageJson } from "../../utils/packageJson.utils";

export interface IExclude {
  match(packageJson: PackageJson): boolean;
}

export class RegexExclude implements IExclude {
  private regex: RegExp;

  constructor(regexPattern: string, flags: string) {
    this.regex = new RegExp(regexPattern, flags);
  }

  match(packageJson: PackageJson): boolean {
    return this.regex.test(packageJson.identifier);
  }
}

export class StringExclude implements IExclude {
  private pattern: string;

  constructor(pattern: string) {
    this.pattern = pattern;
  }

  match(packageJson: PackageJson): boolean {
    return this.pattern === packageJson.name || this.pattern === packageJson.identifier;
  }
}

const tryParseARegexString = /^\/(.+)\/([gimsuy]*)$/;
const isRegexPattern = (input: string): false | [string, string] => {
  const match = input.match(tryParseARegexString);
  return match ? [match[1], match[2]] : false;
};

export const expandExcludes = (patterns: string[] | undefined): IExclude[] => {
  if (!patterns) return [];

  return patterns.map(pattern => {
    const regexMatch = isRegexPattern(pattern);
    if (regexMatch) {
      const [regexPattern, flags] = regexMatch;
      return new RegexExclude(regexPattern, flags);
    } else {
      return new StringExclude(pattern);
    }
  });
};
