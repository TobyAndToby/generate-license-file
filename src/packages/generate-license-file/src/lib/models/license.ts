const BULLET = " - ";
const PREFIX = "The following npm package may be included in this product:";
const PREFIX_PLURAL = "The following npm packages may be included in this product:";
const MIDFIX = "This package contains the following license and notice below:";
const MIDFIX_PLURAL = "These packages each contain the following license and notice below:";

/**
 * ILicense contains the content of a given license and the list of dependencies it pertains to.
 */
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
  private static readonly lineEndingRegex = /\r\n|\r|\n/g;

  public content: string;
  public dependencies: string[];

  public constructor(content: string, dependencies: string[]) {
    this.content = content;
    this.dependencies = dependencies;
  }

  public format(EOL: string): string {
    const formattedText =
      this.prefix(EOL) +
      this.formatDependencies(EOL) +
      this.midfix(EOL) +
      this.normalizeLineEndings(this.content.trim(), EOL);

    return formattedText;
  }

  private prefix(EOL: string): string {
    if (this.dependencies.length === 1) {
      return PREFIX + EOL + EOL;
    }

    return PREFIX_PLURAL + EOL + EOL;
  }

  private formatDependencies(EOL: string): string {
    const formattedText = this.dependencies
      .sort((a, b) => a.localeCompare(b))
      .map(dependency => {
        return BULLET + dependency + EOL;
      });

    return formattedText.join("");
  }

  private midfix(EOL: string): string {
    if (this.dependencies.length === 1) {
      return EOL + MIDFIX + EOL + EOL;
    }

    return EOL + MIDFIX_PLURAL + EOL + EOL;
  }

  private normalizeLineEndings(text: string, EOL: string): string {
    return text.replace(License.lineEndingRegex, EOL);
  }
}
