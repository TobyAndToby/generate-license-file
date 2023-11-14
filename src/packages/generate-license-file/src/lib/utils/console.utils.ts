/* eslint-disable @typescript-eslint/no-explicit-any */
import { spinner } from "../cli/spinner";

class ConsoleUtils {
  public log(message?: any, ...optionalParams: any[]) {
    this.writeMessage(global.console.log, message, ...optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]) {
    this.writeMessage(global.console.warn, message, ...optionalParams);
  }

  public error(message?: any, ...optionalParams: any[]) {
    this.writeMessage(global.console.error, message, ...optionalParams);
  }

  private writeMessage(
    logger: (message?: any, ...optionalParams: any[]) => void,
    message?: any,
    ...optionalParams: any[]
  ) {
    let isSpinning = spinner.isSpinning;
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
