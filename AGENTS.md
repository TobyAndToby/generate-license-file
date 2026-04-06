# Project: generate-license-file

CLI and library tool that aggregates third-party production dependency licenses into a single output file. Supports npm and pnpm workspaces, a webpack plugin, and a programmatic API.

## Project Structure

NX monorepo. All source lives under `src/` and commands are run from there:

```
src/
  packages/
    generate-license-file/       # Main package: CLI + library API
    webpack-plugin/              # Webpack integration (wraps main package)
    e2e-helpers/                 # Shared E2E test utilities
    generate-license-file-e2e/   # E2E test suites (npm, pnpm, config-file, etc.)
  dist/                          # Build output (gitignored)
```

## Common Commands

All commands must be run from the `src/` directory:

```bash
npm run build          # Build all packages (outputs to src/dist/)
npm run lint           # ESLint --fix + Prettier --write
npm run test           # Unit tests across all packages
npm run test:e2e       # End-to-end tests
```

**Running tests for a specific package:**
```bash
nx test generate-license-file
nx test webpack-plugin
```

**Running a single test file:**
```bash
nx run generate-license-file:test --testFile=packages/generate-license-file/test/foo.spec.ts
```

Or pass Jest flags directly:
```bash
nx run generate-license-file:test -- --testNamePattern="my test name"
```

**Running the built CLI locally:**
```bash
nx run generate-license-file:run
# or: node ./dist/packages/generate-license-file/bin/generate-license-file
```

## Architecture: Main Package (`generate-license-file`)

Three public API functions are exported from `src/index.ts`:

- **`generateLicenseFile(input, outputPath, options?)`** — writes license file to disk
- **`getLicenseFileText(input, options?)`** — returns license text as a string
- **`getProjectLicenses(input, options?)`** — returns structured `ILicense[]` data

### Internal data flow

```
Public API
  └─ getLicenseFileText / getProjectLicenses
       └─ resolveLicenses (src/lib/internal/resolveLicenses.ts)
            └─ resolveDependencies (detects npm vs pnpm via lock file presence)
                 ├─ resolveNpmDependencies  (uses @npmcli/arborist)
                 └─ resolvePnpmDependencies (uses pnpm CLI)
                      └─ resolveLicenseContent (license file → SPDX → package.json field)
                         resolveNoticeContent   (NOTICE files)
```

Licenses sharing identical content are deduplicated via a `Map<LicenseNoticeKey, ResolvedLicense>` where the key is `licenseContent:noticeKey`.

### Options system

Options are composed via intersection types in `src/lib/options/`:
- `replace` — swap a package's license content with a custom string or file
- `exclude` — omit specific packages by name
- `append` — add custom text at the end of the output
- `omitVersions` — strip version numbers from package entries
- `lineEnding` — control CRLF vs LF

Config file support via cosmiconfig (looks for `.glf`, `.generatelicensefile`, or custom names). Schema validated with Zod.

## Code Conventions

- **Prettier**: `printWidth: 100`, double quotes, trailing commas, `prettier-plugin-organize-imports`
- **TypeScript**: strict mode, `ES2015` target, `ESNext` modules
- Tests use **Jest** with `jest-when` for mock setup; test files live in `test/` alongside `src/`
- The `/* istanbul ignore */` comment is used to exclude CLI entry points and unreachable branches from coverage
- NX enforces module boundaries via ESLint — packages cannot import from each other arbitrarily

## Adding a New Package Manager

The package manager is detected in `src/lib/internal/resolveDependencies/index.ts` by checking for a lock file. Add a new `case` to the switch and implement a corresponding resolver module following the pattern of `resolveNpmDependencies.ts`.
