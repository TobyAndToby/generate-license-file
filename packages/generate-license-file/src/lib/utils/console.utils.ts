import { spinner } from "../cli/spinner";

class ConsoleUtils {
  public log(message?: unknown, ...optionalParams: unknown[]) {
    this.writeMessage(global.console.log, message, ...optionalParams);
  }

  public warn(message?: unknown, ...optionalParams: unknown[]) {
    this.writeMessage(global.console.warn, message, ...optionalParams);
  }

  public error(message?: unknown, ...optionalParams: unknown[]) {
    this.writeMessage(global.console.error, message, ...optionalParams);
  }

  private writeMessage(
    logger: (message?: unknown, ...optionalParams: unknown[]) => void,
    message?: unknown,
    ...optionalParams: unknown[]
  ) {
    const isSpinning = spinner.isSpinning;
    if (isSpinning) {
      spinner.stop();
    }

    logger(message, ...optionalParams);

    if (isSpinning) {
      spinner.start();
    }
  }
}

const consoleUtils = new ConsoleUtils();
export default consoleUtils;
