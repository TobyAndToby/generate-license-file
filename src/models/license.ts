const BULLET: string = " - ";
const PREFIX: string = "The following NPM package may be included in this product:";
const PREFIX_PLURAL: string = "The following NPM packages may be included in this product:";
const MIDFIX: string = "This package contains the following license and notice below:";
const MIDFIX_PLURAL: string = "These packages each contain the following license and notice below:";

export interface ILicense {
  /**
   * Body of the license.
   */
  content: string;

  /**
   * List of node packages that this license applies to.
   */
  dependencies: string[];
}

export class License implements ILicense {
  content: string;
  dependencies: string[];

  public constructor(content: string, dependencies: string[]) {
    this.content = content;
    this.dependencies = dependencies;
  }

  public format(EOL: string): string {
    const formattedText =
      this.prefix(EOL) + this.formatDependencies(EOL) + this.midfix(EOL) + this.content.trim();

    return formattedText;
  }

  private prefix(EOL: string): string {
    if (this.dependencies.length === 1) {
      return PREFIX + EOL + EOL;
    }

    return PREFIX_PLURAL + EOL + EOL;
  }

  private midfix(EOL: string): string {
    if (this.dependencies.length === 1) {
      return EOL + MIDFIX + EOL + EOL;
    }

    return EOL + MIDFIX_PLURAL + EOL + EOL;
  }

  private formatDependencies(EOL: string): string {
    const formattedText = this.dependencies.map(dependency => {
      return BULLET + dependency + EOL;
    });

    return formattedText.join("");
  }
}
