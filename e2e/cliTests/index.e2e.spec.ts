import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import { promisify } from "util";
import { allLineEndings, getLineEndingValue } from "../../src/lineEndings";
import { LineEnding } from "../../src/main";
import { describeEachLineEnding } from "../describes/lineEndings";
import { describeAllTestPackagesAtOnce, describeEachTestPackage } from "../describes/testPackages";

const execAsync = promisify(exec);

describe("cli", () => {
  describeEachTestPackage((packageJsonUnderTest, isAbsolute) => {
    let directoryUnderTest = "";
    let outputFileName = "";
    let outputFilePath = "";

    let input = "";
    let output = "";

    beforeEach(async () => {
      directoryUnderTest = getDirectoryUnderTest(packageJsonUnderTest, isAbsolute);
      outputFileName = `test-${Math.floor(Math.random() * 1000)}.txt`;
      outputFilePath = path.join(directoryUnderTest, outputFileName);

      input = isAbsolute ? path.join(directoryUnderTest, "package.json") : "./package.json";
      output = isAbsolute ? path.join(directoryUnderTest, outputFileName) : outputFileName;
    });

    afterEach(async () => {
      try {
        await fs.unlink(outputFilePath);
      } catch {
        // empty
      }
    });

    it("should match snapshot with just --input and --output", async () => {
      await execAsync(`npx generate-license-file --input ${input} --output ${output}`, {
        cwd: directoryUnderTest
      });

      const result = await fs.readFile(outputFilePath, "utf8");
      expect(result).toMatchSnapshot();
    });

    it("should match snapshot with --output given before --input", async () => {
      await execAsync(`npx generate-license-file --output ${output} --input ${input}`, {
        cwd: directoryUnderTest
      });

      const result = await fs.readFile(outputFilePath, "utf8");
      expect(result).toMatchSnapshot();
    });

    it("should match snapshot using -i and -o", async () => {
      await execAsync(`npx generate-license-file -i ${input} -o ${output}`, {
        cwd: directoryUnderTest
      });

      const result = await fs.readFile(outputFilePath, "utf8");
      expect(result).toMatchSnapshot();
    });

    it("should match snapshot with --input and --output wrapped in double quotes", async () => {
      await execAsync(`npx generate-license-file --input "${input}" --output "${output}"`, {
        cwd: directoryUnderTest
      });

      const result = await fs.readFile(outputFilePath, "utf8");
      expect(result).toMatchSnapshot();
    });

    describe("overwrite", () => {
      it("should overwrite the file if --overwrite is given", async () => {
        const fileContent = "File content to be overwritten";

        await fs.writeFile(outputFilePath, fileContent);

        await execAsync(
          `npx generate-license-file --input ${input} --output ${output} --overwrite`,
          { cwd: directoryUnderTest }
        );

        const result = await fs.readFile(outputFilePath, "utf8");
        expect(result).not.toMatch(fileContent);
      });
    });

    describeEachLineEnding(lineEnding => {
      let lineEndingsNotUnderTest: LineEnding[] = [];

      beforeEach(async () => {
        lineEndingsNotUnderTest = allLineEndings.filter(x => x !== lineEnding);
      });

      it("should match snapshot when --eol is given", async () => {
        await execAsync(
          `npx generate-license-file --input ${input} --output ${output} --eol ${lineEnding}`,
          { cwd: directoryUnderTest }
        );

        const result = await fs.readFile(outputFilePath, "utf8");
        expect(result).toMatchSnapshot();
      });

      it("should contain the correct line ending value", async () => {
        const expectedLineEndingValue = getLineEndingValue(lineEnding);

        await execAsync(
          `npx generate-license-file --input ${input} --output ${output} --eol ${lineEnding}`,
          { cwd: directoryUnderTest }
        );

        const result = await fs.readFile(outputFilePath, "utf8");
        expect(result).toContain(expectedLineEndingValue);
      });

      lineEndingsNotUnderTest.forEach(otherLineEnding =>
        it(`should not contain the incorrect line ending value (${otherLineEnding})`, async () => {
          const incorrectLineEndingValue = getLineEndingValue(otherLineEnding);

          await execAsync(
            `npx generate-license-file --input ${input} --output ${output} --eol ${lineEnding}`,
            { cwd: directoryUnderTest }
          );

          const result = await fs.readFile(outputFilePath, "utf8");
          expect(result).not.toContain(incorrectLineEndingValue);
        })
      );
    });

    describe("no-spinner", () => {
      it("should match snapshot when --no-spinner is given", async () => {
        await execAsync(
          `npx generate-license-file --input ${input} --output ${output} --no-spinner`,
          { cwd: directoryUnderTest }
        );

        const result = await fs.readFile(outputFilePath, "utf8");
        expect(result).toMatchSnapshot();
      });
    });

    describe("ci", () => {
      it("should match snapshot when --ci is given", async () => {
        await execAsync(`npx generate-license-file --input ${input} --output ${output} --ci`, {
          cwd: directoryUnderTest
        });

        const result = await fs.readFile(outputFilePath, "utf8");
        expect(result).toMatchSnapshot();
      });
    });

    describe("version", () => {
      it("should not produce an output when --version is given", async () => {
        await execAsync(`npx generate-license-file --input ${input} --output ${output} --version`, {
          cwd: directoryUnderTest
        });

        await expect(fs.stat(outputFilePath)).rejects.toThrow();
      });

      it("should not produce an output when -v is given", async () => {
        await execAsync(`npx generate-license-file -i ${input} -o ${output} -v`, {
          cwd: directoryUnderTest
        });

        await expect(fs.stat(outputFilePath)).rejects.toThrow();
      });

      it("should return the current version when --version is given", async () => {
        const { stdout } = await execAsync(`npx generate-license-file --version`, {
          cwd: directoryUnderTest
        });

        expect(stdout.trim()).toBe("v0.0.0");
      });

      it("should return the current version when -v is given", async () => {
        const { stdout } = await execAsync(`npx generate-license-file -v`, {
          cwd: directoryUnderTest
        });

        expect(stdout.trim()).toBe("v0.0.0");
      });
    });
  });

  describeAllTestPackagesAtOnce((packageJsonsUnderTest, isAbsolute) => {
    const directoryUnderTest = __dirname;
    let outputFileName = "";
    let outputFilePath = "";

    let inputs = "";
    let output = "";

    beforeEach(async () => {
      outputFileName = `test-${Math.floor(Math.random() * 1000)}.txt`;
      outputFilePath = path.join(directoryUnderTest, outputFileName);

      inputs = "--input " + packageJsonsUnderTest.join(" --input ");
      output = isAbsolute ? path.join(directoryUnderTest, outputFileName) : outputFileName;
    });

    fit("should match snapshot using --input", async () => {
      // await execAsync(`npx generate-license-file ${inputs} --output ${output}`, {
      //   cwd: directoryUnderTest
      // });

      const command = `npx generate-license-file ${inputs} --output ${output}`;

      console.log({ command, cwd: directoryUnderTest });

      // const result = await fs.readFile(outputFilePath, "utf8");
      // expect(result).toMatchSnapshot();
    });
  });
});

const getDirectoryUnderTest = (packageJsonUnderTest: string, isAbsolute: boolean): string => {
  const dir = path.dirname(packageJsonUnderTest);

  if (isAbsolute) {
    return dir;
  }

  return path.join(__dirname, "../../", dir);
};
