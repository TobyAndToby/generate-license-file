import ora, { Options } from "ora";

const mockDotsSpinner = {};
jest.mock("cli-spinners", () => ({
  dots: mockDotsSpinner,
}));

jest.mock("ora", () => jest.fn());

describe("spinner", () => {
  const mockedOra = jest.mocked(ora);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should use the dots spinner", () => {
    jest.isolateModules(() => {
      require("../../src/cli/spinner");
    });

    expect(mockedOra).toHaveBeenCalledTimes(1);

    const firstCallFirstArg = mockedOra.mock.calls[0][0] as Options;
    expect(firstCallFirstArg.spinner).toBe(mockDotsSpinner);
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
