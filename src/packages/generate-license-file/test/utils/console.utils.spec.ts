import consoleUtils from "../../src/lib/utils/console.utils";
import { spinner } from "../../src/lib/cli/spinner";

jest.mock("../../src/lib/cli/spinner", () => ({
  spinner: {
    isSpinning: false,
    start: jest.fn(),
    stop: jest.fn(),
  },
}));

describe("ConsoleUtils", () => {
  const mockSpinner = jest.mocked(spinner);

  let originalLog: typeof global.console.log;
  let originalWarn: typeof global.console.warn;
  let originalError: typeof global.console.error;

  const mockLog = jest.fn();
  const mockWarn = jest.fn();

  const mockError = jest.fn();

  beforeAll(() => {
    originalLog = global.console.log;
    originalWarn = global.console.warn;
    originalError = global.console.error;

    global.console.log = mockLog;
    global.console.warn = mockWarn;
    global.console.error = mockError;
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    global.console.log = originalLog;
    global.console.warn = originalWarn;
    global.console.error = originalError;
  });

  describe("log", () => {
    it("should call console.log with the given message", () => {
      const message = "console log message";

      consoleUtils.log(message);

      const firstCallFirstArg = mockLog.mock.calls[0][0];
      expect(firstCallFirstArg).toBe(message);
    });

    it("should call console.log with the given params", () => {
      const message = "console log message";

      consoleUtils.log(message, "param1", "param2");

      const firstCallSecondArg = mockLog.mock.calls[0][1];
      expect(firstCallSecondArg).toBe("param1");

      const firstCallThirdArg = mockLog.mock.calls[0][2];
      expect(firstCallThirdArg).toBe("param2");
    });

    it("should stop and restart the spinner if it is spinning", () => {
      setMockIsSpinning(true);

      expect(spinner.stop).not.toHaveBeenCalled();
      expect(spinner.start).not.toHaveBeenCalled();

      consoleUtils.log("console log message");

      expect(spinner.stop).toHaveBeenCalledTimes(1);
      expect(spinner.start).toHaveBeenCalledTimes(1);
    });

    it("should not stop and restart the spinner if it is not spinning", () => {
      setMockIsSpinning(false);

      expect(spinner.stop).not.toHaveBeenCalled();
      expect(spinner.start).not.toHaveBeenCalled();

      consoleUtils.log("console log message");

      expect(spinner.stop).not.toHaveBeenCalled();
      expect(spinner.start).not.toHaveBeenCalled();
    });
  });

  describe("warn", () => {
    it("should call console.warn with the given message", () => {
      const message = "console warn message";

      consoleUtils.warn(message);

      const firstCallFirstArg = mockWarn.mock.calls[0][0];
      expect(firstCallFirstArg).toBe(message);
    });

    it("should call console.warn with the given params", () => {
      const message = "console warn message";

      consoleUtils.warn(message, "param1", "param2");

      const firstCallSecondArg = mockWarn.mock.calls[0][1];
      expect(firstCallSecondArg).toBe("param1");

      const firstCallThirdArg = mockWarn.mock.calls[0][2];
      expect(firstCallThirdArg).toBe("param2");
    });

    it("should stop and restart the spinner if it is spinning", () => {
      setMockIsSpinning(true);

      expect(spinner.stop).not.toHaveBeenCalled();
      expect(spinner.start).not.toHaveBeenCalled();

      consoleUtils.warn("console log message");

      expect(spinner.stop).toHaveBeenCalledTimes(1);
      expect(spinner.start).toHaveBeenCalledTimes(1);
    });

    it("should not stop and restart the spinner if it is not spinning", () => {
      setMockIsSpinning(false);

      expect(spinner.stop).not.toHaveBeenCalled();
      expect(spinner.start).not.toHaveBeenCalled();

      consoleUtils.warn("console log message");

      expect(spinner.stop).not.toHaveBeenCalled();
      expect(spinner.start).not.toHaveBeenCalled();
    });
  });

  describe("error", () => {
    it("should call console.error with the given message", () => {
      const message = "console error message";

      consoleUtils.error(message);

      const firstCallFirstArg = mockError.mock.calls[0][0];
      expect(firstCallFirstArg).toBe(message);
    });

    it("should call console.error with the given params", () => {
      const message = "console error message";

      consoleUtils.error(message, "param1", "param2");

      const firstCallSecondArg = mockError.mock.calls[0][1];
      expect(firstCallSecondArg).toBe("param1");

      const firstCallThirdArg = mockError.mock.calls[0][2];
      expect(firstCallThirdArg).toBe("param2");
    });

    it("should stop and restart the spinner if it is spinning", () => {
      setMockIsSpinning(true);

      expect(spinner.stop).not.toHaveBeenCalled();
      expect(spinner.start).not.toHaveBeenCalled();

      consoleUtils.error("console log message");

      expect(spinner.stop).toHaveBeenCalledTimes(1);
      expect(spinner.start).toHaveBeenCalledTimes(1);
    });

    it("should not stop and restart the spinner if it is not spinning", () => {
      setMockIsSpinning(false);

      expect(spinner.stop).not.toHaveBeenCalled();
      expect(spinner.start).not.toHaveBeenCalled();

      consoleUtils.error("console log message");

      expect(spinner.stop).not.toHaveBeenCalled();
      expect(spinner.start).not.toHaveBeenCalled();
    });
  });

  const setMockIsSpinning = (state: boolean) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // noinspection JSConstantReassignment
    mockSpinner.isSpinning = state;
  };
});
