import { allLineEndings } from "../../src/lineEndings";
import { LineEnding } from "../../src/main";

type DescribeEachLineEndingCallback = (lineEnding: LineEnding) => void;

export const describeEachLineEnding = (callback: DescribeEachLineEndingCallback) => {
  allLineEndings.forEach(lineEnding =>
    describe("for line ending " + lineEnding, () => callback(lineEnding))
  );
};
