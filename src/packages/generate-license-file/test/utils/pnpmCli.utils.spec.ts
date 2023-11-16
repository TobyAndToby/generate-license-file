import { getPnpmProjectDependencies, getPnpmVersion } from "../../src/lib/utils/pnpmCli.utils";
import { execAsync } from "../../src/lib/utils/exec.utils";

jest.mock("../../src/lib/utils/exec.utils", () => ({
  execAsync: jest.fn(),
}));

describe("pnpmCli.utils", () => {
  const mockedExecAsync = jest.mocked(execAsync);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => jest.restoreAllMocks());

  describe("getPnpmVersion", () => {
    it("should call the pnpm cli with the correct arguments", async () => {
      mockedExecAsync.mockResolvedValue({ stdout: "1.2.3" } as any);

      await getPnpmVersion();

      expect(mockedExecAsync).toHaveBeenCalledTimes(1);
      expect(mockedExecAsync).toHaveBeenCalledWith("pnpm --version");
    });

    it("should format the returned value from the pnpm cli correctly", async () => {
      mockedExecAsync.mockResolvedValue({ stdout: "1.2.3" } as any);

      const result = await getPnpmVersion();

      expect(result).toEqual({ major: 1, minor: 2, patch: 3 });
    });
  });

  describe("getPnpmProjectDependencies", () => {
    it("should call the pnpm cli with the correct arguments", async () => {
      const projectDirectory = "/path/to/project";
      mockedExecAsync.mockResolvedValue({ stdout: "{}" } as any);

      await getPnpmProjectDependencies(projectDirectory);

      expect(mockedExecAsync).toHaveBeenCalledTimes(1);
      expect(mockedExecAsync).toHaveBeenCalledWith("pnpm licenses list --json --prod", {
        cwd: projectDirectory,
      });
    });

    it("should format the returned value from the pnpm cli correctly", async () => {
      const projectDirectory = "/path/to/project";
      const expected = [
        {
          name: "dep1",
          version: "1.2.3",
          path: "/path/to/project/node_modules/dep1",
        },
        {
          name: "dep2",
          version: "4.5.6",
          path: "/path/to/project/node_modules/dep2",
        },
      ];

      const mockStdOut = JSON.stringify({ anySpdxKey: expected });
      mockedExecAsync.mockResolvedValue({
        stdout: mockStdOut,
      } as any);

      const result = await getPnpmProjectDependencies(projectDirectory);

      expect(result).toEqual(expected);
    });
  });
});
