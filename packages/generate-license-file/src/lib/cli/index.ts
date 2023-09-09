import { mainCommand } from "./commands/main";

export const main = async (args: string[]): Promise<void> => {
  await program.parseAsync(args);
};

const program = mainCommand;
