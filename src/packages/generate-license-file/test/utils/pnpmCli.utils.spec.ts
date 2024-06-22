import { execAsync } from "../../src/lib/utils/exec.utils";
import { getPnpmProjectDependencies, getPnpmVersion } from "../../src/lib/utils/pnpmCli.utils";

jest.mock("../../src/lib/utils/exec.utils", () => ({
  execAsync: jest.fn(),
}));

type MockExecStdOut = { stdout: string | Buffer; stderr: string | Buffer };

describe("pnpmCli.utils", () => {
  const mockedExecAsync = jest.mocked(execAsync);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => jest.restoreAllMocks());

  describe("getPnpmVersion", () => {
    it("should call the pnpm cli with the correct arguments", async () => {
      mockedExecAsync.mockResolvedValue({ stdout: "1.2.3" } as MockExecStdOut);

      await getPnpmVersion();

      expect(mockedExecAsync).toHaveBeenCalledTimes(1);
      expect(mockedExecAsync).toHaveBeenCalledWith("pnpm --version");
    });

    it("should format the returned value from the pnpm cli correctly", async () => {
      mockedExecAsync.mockResolvedValue({ stdout: "1.2.3" } as MockExecStdOut);

      const result = await getPnpmVersion();

      expect(result).toEqual({ major: 1, minor: 2, patch: 3 });
    });
  });

  describe("getPnpmProjectDependencies", () => {
    it("should call the pnpm cli with the correct arguments", async () => {
      const projectDirectory = "/path/to/project";
      mockedExecAsync.mockResolvedValue({ stdout: "{}" } as MockExecStdOut);

      await getPnpmProjectDependencies(projectDirectory);

      expect(mockedExecAsync).toHaveBeenCalledTimes(1);
      expect(mockedExecAsync).toHaveBeenCalledWith("pnpm licenses list --json --prod", {
        cwd: projectDirectory,
      });
    });

    it("should be able to handle <9.0.0 command output", async () => {
      // Before pnpm 9.0.0 the output contained a single path per dependency

      const projectDirectory = "/path/to/project";
      const expected = [
        {
          name: "dep1",
          paths: ["/path/to/project/node_modules/dep1"],
        },
        {
          name: "dep2",
          paths: ["/path/to/project/node_modules/dep2"],
        },
      ];

      const mockStdOut = JSON.stringify({
        anySpdxKey: [
          {
            name: "dep1",
            path: "/path/to/project/node_modules/dep1",
          },
          {
            name: "dep2",
            path: "/path/to/project/node_modules/dep2",
          },
        ],
      });

      mockedExecAsync.mockResolvedValue({
        stdout: mockStdOut,
      } as MockExecStdOut);

      const result = await getPnpmProjectDependencies(projectDirectory);

      expect(result).toEqual(expected);
    });

    it("should be able to handle >=9.0.0 command output", async () => {
      // From pnpm 9.0.0 the output can contain multiple paths per dependency

      const projectDirectory = "/path/to/project";
      const expected = [
        {
          name: "dep1",
          paths: ["/path/to/project/node_modules/dep1"],
        },
        {
          name: "dep2",
          paths: ["/path/to/project/node_modules/dep2", "/path/to/project/node_modules/dep2/again"],
        },
      ];

      const mockStdOut = JSON.stringify({
        anySpdxKey: [
          {
            name: "dep1",
            paths: ["/path/to/project/node_modules/dep1"],
          },
          {
            name: "dep2",
            paths: [
              "/path/to/project/node_modules/dep2",
              "/path/to/project/node_modules/dep2/again",
            ],
          },
        ],
      });

      mockedExecAsync.mockResolvedValue({
        stdout: mockStdOut,
      } as MockExecStdOut);

      const result = await getPnpmProjectDependencies(projectDirectory);

      expect(result).toEqual(expected);
    });

    it("should throw an error if the output is not valid", async () => {
      const projectDirectory = "/path/to/project";

      const mockStdOut = JSON.stringify({
        anySpdxKey: [
          {
            someRandom: "stuff",
          },
        ],
      });

      mockedExecAsync.mockResolvedValue({
        stdout: mockStdOut,
      } as MockExecStdOut);

      const promise = getPnpmProjectDependencies(projectDirectory);
      await expect(promise).rejects.toThrow("Failed to parse pnpm licenses list output");
    });
  });
});
