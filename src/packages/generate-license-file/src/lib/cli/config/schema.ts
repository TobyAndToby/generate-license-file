import { z } from "zod";

export const configSchema = z
  .object({
    inputs: z.string().nonempty().array().optional(),
    output: z.string().nonempty().optional(),
    overwrite: z
      .boolean()
      .optional()
      // TODO: Remove. With the addition of config files the user has the ability to
      // set overwrite to false. This was not possible via the CLI (which only ever
      // gave true or undefined), and the usage of the overwrite flag in the output
      // resolution no longer worked. This overrides any false value with undefined
      // to restore output resolution.
      .transform(o => (o ? o : undefined)),
    spinner: z.boolean().optional(),
    ci: z.boolean().optional(),
    eol: z.union([z.literal("crlf"), z.literal("lf")]).optional(),
    replace: z.record(z.string().nonempty(), z.string().nonempty()).optional(),
    exclude: z.string().nonempty().array().optional(),
  })
  .optional();

export type ConfigSchema = z.infer<typeof configSchema>;

export const parseSchema = (input: unknown): ConfigSchema => {
  const parseResult = configSchema.safeParse(input);

  if (parseResult.success) {
    return parseResult.data;
  }

  throw new Error(`Invalid config: ${JSON.stringify(parseResult.error.issues)}`);
};
