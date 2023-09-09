import { LineEnding } from "../lineEndings";

export type LineEndingOption = {
  /**
   * Specify the line ending to use in the generated license file
   *
   * If you don't specify a line ending then line ending of the operating
   * system will be used
   *
   * This is useful if different operating systems are used by different
   * people who are working of the same project
   */
  lineEnding?: LineEnding;
};
