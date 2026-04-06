const require_runtime = require('../../../_virtual/_rolldown/runtime.cjs');
let zod = require("zod");

//#region src/lib/cli/config/schema.ts
const configSchema = zod.z.object({
	inputs: zod.z.string().nonempty().array().optional(),
	output: zod.z.string().nonempty().optional(),
	overwrite: zod.z.boolean().optional().transform((o) => o ? o : void 0),
	spinner: zod.z.boolean().optional(),
	ci: zod.z.boolean().optional(),
	eol: zod.z.union([zod.z.literal("crlf"), zod.z.literal("lf")]).optional(),
	replace: zod.z.record(zod.z.string().nonempty(), zod.z.string().nonempty()).optional(),
	exclude: zod.z.string().nonempty().array().optional(),
	append: zod.z.string().nonempty().array().optional(),
	omitVersions: zod.z.boolean().optional()
}).optional();
const parseSchema = (input) => {
	const parseResult = configSchema.safeParse(input);
	if (parseResult.success) return parseResult.data;
	throw new Error(`Invalid config: ${JSON.stringify(parseResult.error.issues)}`);
};

//#endregion
exports.parseSchema = parseSchema;