const [, , version] = Bun.argv;

const pkg = "package.json";
const content = await Bun.file(pkg).text();
const updated = content
  .replace(/"\*"/g, `"${version}"`)
  .replace(/"workspace:\*"/g, `"${version}"`);

await Bun.write(pkg, updated);

export {};
