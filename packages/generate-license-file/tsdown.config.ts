import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    cli: "src/lib/cli/index.ts",
  },
  format: ["cjs", "esm"],
  platform: "node",
  dts: true,
  clean: true,
  unbundle: true,
  minify: false,
});
