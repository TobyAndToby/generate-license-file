//#region src/lib/lineEndings.d.ts
declare const lineEndings: readonly ["crlf", "lf"];
/**
 * Used to specify which line endings to use in the generated file.
 *
 * Possible values are:
 *
 * `crlf` (`\r\n`)
 *
 * `lf` (`\n`)
 */
type LineEnding = (typeof lineEndings)[number];
//#endregion
export { LineEnding };