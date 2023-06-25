import os from "os";

const lineEndingValues = ["\r\n", "\n"] as const;

export type LineEndingCharacters = typeof lineEndingValues[number];

const lineEndings = {
  crlf: "\r\n",
  lf: "\n",
} satisfies Record<string, LineEndingCharacters>;

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

export const getLineEndingCharacters = (input: LineEnding | undefined): LineEndingCharacters => {
  if (input === undefined) {
    return os.EOL as LineEndingCharacters;
  }

  const lineEndingValue = lineEndings[input as LineEnding];

  if (!lineEndingValue) {
    throw new Error(`Unknown line ending value: ${input}`);
  }

  return lineEndingValue;
};
