import ora, { Options } from "ora";
import { mocked } from "ts-jest/utils";

const mockPongSpinner = {};
jest.mock("cli-spinners", () => ({
  pong: mockPongSpinner
}));

jest.mock("ora", () => jest.fn());

describe("spinner", () => {
  const mockedOra = mocked(ora);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should use the pong spinner", () => {
    jest.isolateModules(() => {
      require("../../src/cli/spinner");
    });

    expect(mockedOra).toHaveBeenCalledTimes(1);

    const firstCallFirstArg = mockedOra.mock.calls[0][0] as Options;
    expect(firstCallFirstArg.spinner).toBe(mockPongSpinner);
  });

  it("should use the text 'Resolving licenses...'", () => {
    jest.isolateModules(() => {
      require("../../src/cli/spinner");
    });

    expect(mockedOra).toHaveBeenCalledTimes(1);

    const firstCallFirstArg = mockedOra.mock.calls[0][0] as Options;
    expect(firstCallFirstArg.text).toBe("Resolving licenses...");
  });
});
