import { createMainCommand } from "./commands/main";

export const main = async (args: string[]): Promise<void> => {
  const program = createMainCommand();
  await program.parseAsync(args);
};
