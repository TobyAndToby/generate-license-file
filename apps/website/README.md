# Website

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator. The repo uses [Bun](https://bun.sh/) + [Turborepo](https://turborepo.com/).

### Installation

Run from the repo root:

```
$ bun install
```

### Local Development

```
$ bun run dev
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

Alternatively, to run only the website: `bun run --filter @generate-license-file/website dev`.

### Build

```
$ bun run build
```

This generates static content into the `build` directory and can be served using any static-content hosting service.
