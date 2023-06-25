import { z } from "zod";

export const configSchema = z
  .object({
    inputs: z.string().array().optional(),
    output: z.string().optional(),
    overwrite: z.boolean().optional(),
    noSpinner: z.boolean().optional(),
    ci: z.boolean().optional(),
    eol: z.union([z.literal("crlf"), z.literal("lf")]).optional(),
  })
  .optional();

export type ConfigSchema = z.infer<typeof configSchema>;

export const parseSchema = (input: unknown): ConfigSchema => {
  const parseResult = configSchema.safeParse(input);

  if (parseResult.success) {
    return parseResult.data;
  }

  throw new Error(`Invalid config: ${parseResult.error.issues}`);
};
