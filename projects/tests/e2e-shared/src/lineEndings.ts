import { LineEnding } from "generate-license-file";

type DescribeEachLineEndingCallback = (lineEnding: LineEnding, lineEndingLiteral: string) => void;

const lineEndings: Record<LineEnding, string> = {
  crlf: "\r\n",
  lf: "\n"
};

export const describeEachLineEnding = (callback: DescribeEachLineEndingCallback) => {
  for (const key in lineEndings) {
    const lineEnding = key as LineEnding;
    const value = lineEndings[lineEnding];

    describe("for line ending " + key, () => callback(lineEnding, value));
  }
};
