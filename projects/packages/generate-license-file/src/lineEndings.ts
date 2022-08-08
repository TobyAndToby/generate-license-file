import os from "os";

const lineEndings = {
  crlf: "\r\n",
  lf: "\n"
} as const;

/**
 * Used to specify which line endings to use in the generated file.
 *
 * Possible values are:
 *
 * `crlf` (`\r\n`)
 *
 * `lf` (`\n`)
 */
export type LineEnding = keyof typeof lineEndings;

export const allLineEndings = Object.keys(lineEndings) as LineEnding[];

export const isLineEnding = (input: string | undefined): input is LineEnding => {
  if (input === undefined) {
    return true;
  }

  return allLineEndings.includes(input as LineEnding);
};

export const getLineEndingValue = (input: LineEnding | undefined): string => {
  if (input === undefined) {
    return os.EOL;
  }

  const lineEndingValue = lineEndings[input as LineEnding];

  if (!lineEndingValue) {
    throw new Error(`Unknown line ending value: ${input}`);
  }

  return lineEndingValue;
};
