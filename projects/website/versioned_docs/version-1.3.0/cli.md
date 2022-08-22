---
title: CLI
---

import ArgumentInfo from "@site/src/components/docs/cli/ArgumentInfo";

The `generate-license-file` CLI will resolve all of the licenses of your third-party dependencies and write them to a file on the disk.

## --input

<ArgumentInfo type="string" isRequired aliases={["-i"]} />

The input parameter is required and needs be a path to the `package.json` of the project. It can be a relative or absolute path.

```bash
npx generate-license-file --input ./myProject/package.json

npx generate-license-file --input C:/myProject/package.json
```

If the path contains a space, then wrap it in double-quotes.

```bash
npx generate-license-file --input "./my project/package.json"
```

You can also use the `-i` alias.

```bash
npx generate-license-file -i ./myProject/package.json
```

## --output

<ArgumentInfo type="string" isRequired aliases={["-o"]} />

The output parameter is required and needs be a path to desired output file. It can be a relative or absolute path.

```bash
npx generate-license-file --output ./third-party-licenses.txt

npx generate-license-file --output C:/third-party-licenses.txt
```

If the path contains a space, then wrap it in double-quotes.

```bash
npx generate-license-file --output "./my project/third-party-licenses.txt"
```

You can also use the `-o` alias.

```bash
npx generate-license-file -o ./myProject/third-party-licenses.txt
```

## --overwrite

<ArgumentInfo type="boolean" />

If a file already exists at the provided output path, then the CLI won't overwrite it by default.

If you'd like the CLI to overwrite existing files then provide the `--overwrite` flag

```bash
npx generate-license-file --overwrite
```

## --eol

<ArgumentInfo type="string" />

By default the CLI writes files to disk using the default line endings of the current machine.

If you want the output file to use a specific line ending then you can provide either `lf` or `crlf` with the `--eol` flag.

```bash
npx generate-license-file --eol lf

npx generate-license-file --eol crlf
```


## --no-spinner

<ArgumentInfo type="boolean" />

The CLI shows a spinner in the terminal while it's doing it's work.

If the spinner doesn't play nicely with your local or CI/CD environments then you can pass the `--no-spinner` flag to make it only log standard text messages.

```bash
npx generate-license-file --no-spinner
```