import { z } from "zod";

//#region src/lib/cli/config/schema.ts
const configSchema = z.object({
	inputs: z.string().nonempty().array().optional(),
	output: z.string().nonempty().optional(),
	overwrite: z.boolean().optional().transform((o) => o ? o : void 0),
	spinner: z.boolean().optional(),
	ci: z.boolean().optional(),
	eol: z.union([z.literal("crlf"), z.literal("lf")]).optional(),
	replace: z.record(z.string().nonempty(), z.string().nonempty()).optional(),
	exclude: z.string().nonempty().array().optional(),
	append: z.string().nonempty().array().optional(),
	omitVersions: z.boolean().optional()
}).optional();
const parseSchema = (input) => {
	const parseResult = configSchema.safeParse(input);
	if (parseResult.success) return parseResult.data;
	throw new Error(`Invalid config: ${JSON.stringify(parseResult.error.issues)}`);
};

//#endregion
export { parseSchema };