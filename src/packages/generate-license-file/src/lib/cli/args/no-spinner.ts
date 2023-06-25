import { Argument } from "./argument";
import { CombinedConfig } from "../commands/main";

export class NoSpinner extends Argument<boolean> {
  public resolve(config: CombinedConfig): Promise<boolean> {
    const { noSpinner } = config;
    return Promise.resolve(noSpinner ?? false);
  }

  public parse(config: CombinedConfig): Promise<boolean> {
    const { noSpinner } = config;
    return Promise.resolve(noSpinner ?? false);
  }
}
