# AI-Native SDLC Template

A repeatable, minimal-tool workflow from problem definition to production.
Clone this for every new demo/project.

**Stack:** Claude Code + Claude Design + GitHub + Vercel — nothing else.

`CLAUDE.md` is the playbook — Claude Code reads it automatically and
follows the loop (Define & Plan → Design → Build/TDD → Review → Deploy →
Learn) without you re-explaining it each time.

## Use this template for a new project

1. Copy this folder, rename it, `git init`.
2. Follow `CLAUDE.md`'s **One-time setup** section in full — it covers
   creating the GitHub repo and project board, and the Vercel settings
   worth checking explicitly (Production Branch, Deployment Protection,
   Framework Preset) since their defaults don't always match a fresh
   project.
3. Open Claude Code in the folder and say what you're building. It reads
   `CLAUDE.md` and starts at Step 1 (PRD).

## Per feature, repeatable loop
Build the design in Claude Design, then Export → Handoff to Claude Code
→ Send to local coding agent. Claude Code picks up the bundle, checks
out a branch for the GitHub issue, TDDs the feature, pushes, opens a PR
referencing the issue ("Fixes #12"), and Vercel/CI take it from there.

## Structure
- `docs/prd-template.md` — copy to `docs/prd.md`, fill in
- `docs/design-template.md` — pointer only; design itself lives in
  Claude Design and is handed off to Claude Code when ready
- `.github/workflows/ci.yml` — lint + test on every push/PR, regardless
  of branch name
- `.nvmrc` — pins the Node version; update it to match whatever your
  project's framework needs
- Tasks live as GitHub Issues on a GitHub Project board — no separate
  tracker
