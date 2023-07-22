import {
  describeEachLineEnding,
  describeRelativeAndAbsolutePaths,
} from "@generate-license-file/e2e-helpers";
import { exec } from "child_process";
import fs from "fs/promises";
import { LineEnding } from "generate-license-file";
import { lineEndings } from "generate-license-file/src/lib/lineEndings";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

describe("cli", () => {
  describeRelativeAndAbsolutePaths("./package.json", (packageJsonPath) => {
    let outputFileName = "";

    let input = "";
    let output = "";

    let requiresUnlink = true;

    beforeEach(() => {
      outputFileName = `test-${Math.floor(Math.random() * 1000)}.txt`;

      input = packageJsonPath;
      output = path.dirname(packageJsonPath) + "/" + outputFileName;

      requiresUnlink = true;
    });

    afterEach(async () => {
      if (requiresUnlink) {
        await fs.unlink(output);
      }
    });

    it("should match snapshot with just --input and --output", async () => {
      await execAsync(
        `npx generate-license-file --input ${input} --output ${output}`
      );

      const result = await fs.readFile(output, "utf8");
      expect(result).toMatchSnapshot();
    });

    it("should match snapshot with --output given before --input", async () => {
      await execAsync(
        `npx generate-license-file --output ${output} --input ${input}`
      );

      const result = await fs.readFile(output, "utf8");
      expect(result).toMatchSnapshot();
    });

    it("should match snapshot using -i and -o", async () => {
      await execAsync(`npx generate-license-file -i ${input} -o ${output}`);

      const result = await fs.readFile(output, "utf8");
      expect(result).toMatchSnapshot();
    });

    it("should match snapshot with --input and --output wrapped in double quotes", async () => {
      await execAsync(
        `npx generate-license-file --input "${input}" --output "${output}"`
      );

      const result = await fs.readFile(output, "utf8");
      expect(result).toMatchSnapshot();
    });

    describe("overwrite", () => {
      it("should overwrite the file if --overwrite is given", async () => {
        const fileContent = "File content to be overwritten";

        await fs.writeFile(output, fileContent);

        await execAsync(
          `npx generate-license-file --input ${input} --output ${output} --overwrite`
        );

        const result = await fs.readFile(output, "utf8");
        expect(result).not.toMatch(fileContent);
      });
    });

    describeEachLineEnding((lineEnding, lineEndingLiteral) => {
      let lineEndingsNotUnderTest: LineEnding[] = [];

      beforeEach(async () => {
        lineEndingsNotUnderTest = lineEndings.filter((x) => x !== lineEnding);
      });

      it("should match snapshot when --eol is given", async () => {
        await execAsync(
          `npx generate-license-file --input ${input} --output ${output} --eol ${lineEnding}`
        );

        const result = await fs.readFile(output, "utf8");
        expect(result).toMatchSnapshot();
      });

      it("should contain the correct line ending value", async () => {
        const expectedLineEndingValue = lineEndingLiteral;

        await execAsync(
          `npx generate-license-file --input ${input} --output ${output} --eol ${lineEnding}`
        );

        const result = await fs.readFile(output, "utf8");
        expect(result).toContain(expectedLineEndingValue);
      });

      lineEndingsNotUnderTest.forEach((otherLineEnding) =>
        it(`should not contain the incorrect line ending value (${otherLineEnding})`, async () => {
          const incorrectLineEndingValue = lineEndingLiteral;

          await execAsync(
            `npx generate-license-file --input ${input} --output ${output} --eol ${lineEnding}`
          );

          const result = await fs.readFile(output, "utf8");
          expect(result).not.toContain(incorrectLineEndingValue);
        })
      );
    });

    describe("no-spinner", () => {
      it("should match snapshot when --no-spinner is given", async () => {
        await execAsync(
          `npx generate-license-file --input ${input} --output ${output} --no-spinner`
        );

        const result = await fs.readFile(output, "utf8");
        expect(result).toMatchSnapshot();
      });
    });

    describe("ci", () => {
      it("should match snapshot when --ci is given", async () => {
        await execAsync(
          `npx generate-license-file --input ${input} --output ${output} --ci`
        );

        const result = await fs.readFile(output, "utf8");
        expect(result).toMatchSnapshot();
      });
    });

    describe("version", () => {
      beforeEach(() => (requiresUnlink = false));

      it("should not produce an output when --version is given", async () => {
        await execAsync(
          `npx generate-license-file --input ${input} --output ${output} --version`
        );

        await expect(fs.stat(output)).rejects.toThrow();
      });

      it("should not produce an output when -v is given", async () => {
        await execAsync(
          `npx generate-license-file -i ${input} -o ${output} -v`
        );

        await expect(fs.stat(output)).rejects.toThrow();
      });

      it("should return the current version when --version is given", async () => {
        const { stdout } = await execAsync(
          `npx generate-license-file --version`
        );

        expect(stdout.trim()).toBe("v0.0.0");
      });

      it("should return the current version when -v is given", async () => {
        const { stdout } = await execAsync(`npx generate-license-file -v`);

        expect(stdout.trim()).toBe("v0.0.0");
      });
    });
  });
});
