import { LineEndingCharacters } from "../lineEndings";
import { prepareContentForOutput } from "../utils/string.utils";

const BULLET = " - ";
const PREFIX = "The following npm package may be included in this product:";
const PREFIX_PLURAL = "The following npm packages may be included in this product:";
const MIDFIX = "This package contains the following license:";
const MIDFIX_PLURAL = "These packages each contain the following license:";
const NOTICES_PREFIX = "With the following notices:";

/**
 * ILicense contains the content of a given license and the list of dependencies it pertains to.
 */
export interface ILicense {
  /**
   * Body of the license.
   */
  content: string;

  /**
   * Notices for the license.
   */
  notices: string[];

  /**
   * List of node packages that this license applies to.
   */
  dependencies: string[];
}

export class License implements ILicense {
  public content: string;
  public notices: string[];
  public dependencies: string[];

  public constructor(content: string, notices: string[], dependencies: string[]) {
    this.content = content;
    this.notices = notices;
    this.dependencies = dependencies;
  }

  public format(lineEnding: LineEndingCharacters): string {
    let formattedText =
      this.prefix(lineEnding) +
      this.formatDependencies(lineEnding) +
      this.midfix(lineEnding) +
      prepareContentForOutput(this.content.trim(), lineEnding);

    if (this.notices.length > 0) {
      const noticeContent = this.notices.map(notice => notice.trim()).join(lineEnding);

      console.log(noticeContent);

      // Append the notices to the formatted text, preparing content for output to ensure
      // the line endings inside each notice content are consistent.
      formattedText +=
        this.noticesPrefix(lineEnding) + prepareContentForOutput(noticeContent, lineEnding);
    }

    return formattedText;
  }

  private prefix(EOL: string): string {
    if (this.dependencies.length === 1) {
      return PREFIX + EOL + EOL;
    }

    return PREFIX_PLURAL + EOL + EOL;
  }

  private noticesPrefix(EOL: string): string {
    return EOL + EOL + NOTICES_PREFIX + EOL + EOL;
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
}
