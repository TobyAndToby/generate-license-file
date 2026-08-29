# pnpm-hoisted

This project is used to end-2-end test how generate-license-file functions when using pnpm as the
package manager with `nodeLinker: hoisted`, which installs packages into `node_modules` directly
rather than into the `node_modules/.pnpm` virtual store.
