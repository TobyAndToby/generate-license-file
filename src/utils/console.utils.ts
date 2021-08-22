class ConsoleUtils {
  public log(message?: any, ...optionalParams: any[]) {
    global.console.log(message, ...optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]) {
    global.console.warn(message, ...optionalParams);
  }

  public error(message?: any, ...optionalParams: any[]) {
    global.console.error(message, ...optionalParams);
  }
}

const consoleUtils = new ConsoleUtils();
export default consoleUtils;
