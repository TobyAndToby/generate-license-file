export interface AppendOption {
  /**
   * File paths to read in and append to the bottom of the generated license file
   *
   * This is useful for content that's included via a CDN or for other types
   * of content that are not included in the project's package.json
   * like images or fonts
   *
   * @example ["./licenses/some-image.txt", "./licenses/some-font.txt"]
   */
  append?: string[];
}
