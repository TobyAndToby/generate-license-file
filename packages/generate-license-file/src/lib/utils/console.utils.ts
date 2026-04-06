import { spinner } from "../cli/spinner";

class ConsoleUtils {
  // biome-ignore lint/suspicious/noExplicitAny: matches console.log signature
  public log(message?: any, ...optionalParams: any[]) {
    this.writeMessage(global.console.log, message, ...optionalParams);
  }

  // biome-ignore lint/suspicious/noExplicitAny: matches console.warn signature
  public warn(message?: any, ...optionalParams: any[]) {
    this.writeMessage(global.console.warn, message, ...optionalParams);
  }

  // biome-ignore lint/suspicious/noExplicitAny: matches console.error signature
  public error(message?: any, ...optionalParams: any[]) {
    this.writeMessage(global.console.error, message, ...optionalParams);
  }

  private writeMessage(
    // biome-ignore lint/suspicious/noExplicitAny: matches console method signatures
    logger: (message?: any, ...optionalParams: any[]) => void,
    // biome-ignore lint/suspicious/noExplicitAny: matches console method signatures
    message?: any,
    // biome-ignore lint/suspicious/noExplicitAny: matches console method signatures
    ...optionalParams: any[]
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
