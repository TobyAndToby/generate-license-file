Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let generate_license_file = require("generate-license-file");
let webpack = require("webpack");
let path_posix = require("path/posix");
//#region src/lib/defaultOptions.ts
const defaultOptions = {
	outputFileName: "third-party-licenses.txt",
	outputFolder: "./",
	pathToPackageJson: "./package.json",
	isDev: false,
	lineEnding: void 0,
	append: void 0,
	exclude: void 0,
	replace: void 0
};
//#endregion
//#region src/lib/devImplementation.ts
const devImplementation = () => Promise.resolve(`In a production build this file will contain the licenses of your production dependencies.

For dev builds it only contains this text for the sake of build speed.`);
//#endregion
//#region src/lib/asyncProcessAssetTapFactory.ts
const unknownError = "Unknown Error! Check for error output above.";
const asyncProcessAssetTapFactory = (options, compiler, compilation) => {
	const pluginName = LicenseFilePlugin.name;
	const { outputFileName, outputFolder, isDev, pathToPackageJson, lineEnding, append, exclude, replace } = options;
	const getLicenseFileTextOptions = {
		lineEnding,
		append,
		exclude,
		replace
	};
	const RawSource = compiler.webpack.sources.RawSource;
	return (_, resolve) => {
		resolveImplementation(isDev)(pathToPackageJson, getLicenseFileTextOptions).then((text) => {
			const outputPath = (0, path_posix.join)(outputFolder, outputFileName);
			compilation.emitAsset(outputPath, new RawSource(text));
			resolve();
		}).catch((error) => {
			const webpackError = new webpack.WebpackError(`${pluginName}: ${error ?? unknownError}`);
			compilation.errors.push(webpackError);
			resolve(webpackError);
		});
	};
};
const resolveImplementation = (isDev) => {
	if (isDev) return devImplementation;
	return generate_license_file.getLicenseFileText;
};
//#endregion
//#region src/lib/compilationTapFactory.ts
const compilationTapFactory = (options, compiler) => {
	const pluginName = LicenseFilePlugin.name;
	return (compilation) => {
		const processAssetTap = asyncProcessAssetTapFactory(options, compiler, compilation);
		const assetOptions = {
			name: pluginName,
			stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
		};
		compilation.hooks.processAssets.tapAsync(assetOptions, processAssetTap);
	};
};
//#endregion
//#region src/lib/licenseFilePlugin.ts
/**
* Webpack plugin to generate a text file asset containing all of the licenses for your production third-party dependencies.
*/
var LicenseFilePlugin = class LicenseFilePlugin {
	pluginName = LicenseFilePlugin.name;
	options;
	constructor(options) {
		this.options = {
			...defaultOptions,
			...options
		};
	}
	apply(compiler) {
		const compilationTap = compilationTapFactory(this.options, compiler);
		compiler.hooks.thisCompilation.tap(this.pluginName, compilationTap);
	}
};
//#endregion
exports.LicenseFilePlugin = LicenseFilePlugin;
Object.defineProperty(exports, "LineEnding", {
	enumerable: true,
	get: function() {
		return generate_license_file.LineEnding;
	}
});
exports.defaultOptions = defaultOptions;
