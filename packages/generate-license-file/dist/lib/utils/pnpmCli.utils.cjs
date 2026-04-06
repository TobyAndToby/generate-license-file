const require_runtime = require('../../_virtual/_rolldown/runtime.cjs');
const require_console_utils = require('./console.utils.cjs');
const require_exec_utils = require('./exec.utils.cjs');
let zod = require("zod");

//#region src/lib/utils/pnpmCli.utils.ts
const v8DependencyValidator = zod.z.object({
	name: zod.z.string(),
	path: zod.z.string()
});
const v9DependencyValidator = zod.z.object({
	name: zod.z.string(),
	paths: zod.z.string().array()
});
const dependencyValidator = v8DependencyValidator.or(v9DependencyValidator).transform((dep) => ({
	name: dep.name,
	paths: "paths" in dep ? dep.paths : [dep.path]
}));
const pnpmLsJsonStdOutValidator = zod.z.record(zod.z.string(), zod.z.array(dependencyValidator));
const getPnpmVersion = async () => {
	const { stdout } = await require_exec_utils.execAsync("pnpm --version");
	const [major, minor, patch] = stdout.split(".").map(Number);
	return {
		major,
		minor,
		patch
	};
};
const getPnpmProjectDependencies = async (projectDirectory) => {
	const { stdout } = await require_exec_utils.execAsync("pnpm licenses list --json --prod", { cwd: projectDirectory });
	const parsedOutput = JSON.parse(stdout);
	const commandOutput = pnpmLsJsonStdOutValidator.safeParse(parsedOutput);
	if (!commandOutput.success) {
		const errors = JSON.stringify(commandOutput.error.flatten());
		require_console_utils.default.error("Failed to parse pnpm licenses list output: " + errors);
		throw new Error("Failed to parse pnpm licenses list output");
	}
	return Object.values(commandOutput.data).flatMap((dependencies) => dependencies);
};

//#endregion
exports.getPnpmProjectDependencies = getPnpmProjectDependencies;
exports.getPnpmVersion = getPnpmVersion;