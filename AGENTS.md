# AGENTS.md — lite-memo

Obsidian plugin for quick fleeting notes (闪念笔记), similar to Flomo. Supports timestamped capture, tag categorization, and history browsing.

## Layout

- `src/main.ts` — plugin entry, registers view, commands, settings tab
- `src/` — additional source modules
- `manifest.json` / `versions.json` / `styles.css` / `esbuild.config.mjs` / `eslint.config.mjs` / `tsconfig.json`
- `deploy.mjs` / `release.mjs` — maintainer scripts
- `alfred_add_memo.py` — optional Alfred workflow integration
- `TASK_SUPPORT_UPDATE.md` / `TEST_TASKS.md` — feature documentation

## Commands

```bash
npm run dev      # esbuild watch -> dist/main.js
npm run build    # lint + esbuild production + cp manifest.json styles.css dist/
npm run lint     # eslint "**/*.{ts,tsx}"
npm run deploy   # copy dist/ to author's local vaults, then delete dist/
npm run release  # gh release create from manifest.json version
```

`build` enforces lint before bundling. No `tsc` typecheck in the build pipeline. Asset copying is done via shell command in the npm script.

## Build

- esbuild, entry `src/main.ts`, format `cjs`, target `es2018`
- externals: `obsidian`, `electron`, `@codemirror/*`, `@lezer/*`, Node builtins
- Copies `manifest.json` and `styles.css` to `dist/` via shell cp

## Versioning

- `release.mjs` reads version from `manifest.json`
- Keep `package.json`, `manifest.json`, and `versions.json` versions in sync

## Marketplace / Scorecard

Marketplace, manifest, and release conventions live in the parent `obsidian-plugins-parent/AGENTS.md`. Read it before touching `manifest.json`, release flow, or marketplace-facing code.