# Project: generate-license-file

CLI and library tool that aggregates third-party production dependency licenses into a single output file. Supports npm and pnpm workspaces, a webpack plugin, and a programmatic API.

## Project Structure

Bun + Turborepo monorepo with three workspace roots:

```
packages/
  generate-license-file/       # Main package: CLI + library API
  webpack-plugin/              # Webpack integration (wraps main package)
  e2e-helpers/                 # Shared E2E test utilities
apps/
  website/                     # Docusaurus documentation site
e2e/
  config-file/                 # E2E: config file support
  multiple-inputs/             # E2E: multiple input paths
  npm-package/                 # E2E: npm package resolution
  optional-dependencies/       # E2E: optional deps handling
  pnpm/                        # E2E: pnpm workspace support
  test-dependencies/           # E2E: test dependency fixtures
```

## Common Commands

All commands are run from the repo root using Turbo:

```bash
bun run build          # Build all packages (tsdown → dist/)
bun run lint           # Biome check across all packages
bun run test           # Unit tests (Vitest) across all packages
bun run test:e2e       # End-to-end tests
bun run dev            # Dev mode (website + watch builds)
```

**Running a single test file:**
```bash
cd packages/generate-license-file && bunx vitest run test/path/to/file.spec.ts
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

- **Biome**: `lineWidth: 120`, double quotes, trailing commas, LF line endings, organized imports
- **TypeScript**: strict mode, built with tsdown (dual CJS/ESM output)
- Tests use **Vitest** with `vitest-when` for mock setup; test files live in `test/` alongside `src/`
- Package manager: **Bun** (`bun.lock`)

## Adding a New Package Manager

The package manager is detected in `packages/generate-license-file/src/lib/internal/resolveDependencies/index.ts` by checking for a lock file. Add a new `case` to the switch and implement a corresponding resolver module following the pattern of `resolveNpmDependencies.ts`.
