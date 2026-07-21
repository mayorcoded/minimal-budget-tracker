# Project Playbook — AI-Native SDLC (Minimal Stack)

Tools: Claude Code (you) + Claude Design + GitHub + Vercel. Nothing
else. GitHub is the single source of truth — code, PRD, CI config,
*and* task tracking (Issues + Projects) all live in this one repo. The
design itself lives in Claude Design and is handed off to Claude Code
as a bundle when it's ready to build.

Follow this loop in order for a new project or a new feature. Don't skip
steps even if it feels faster to jump to code.

## 1. Define & Plan
- If `docs/prd.md` is missing or still the template, ask the user: What
  problem are we solving? Who are the users? What's the success metric?
  What are the functional and non-functional requirements?
- Write the answers into `docs/prd.md` (replace `docs/prd-template.md`
  structure).
- If this is a brand-new project, also decide the tech/test stack now
  — framework, language, test runner, component-testing library —
  so Step 3 can start TDD immediately without a mid-build pause.
  Default recommendation absent a stronger reason: Next.js +
  TypeScript + Vitest + React Testing Library.
- Break the PRD into small, independent issues. Create each with
  `gh issue create --title "..." --body "..."`, then add it to the
  project board with `gh project item-add <project-number> --owner
  <owner> --url <issue-url>`.
- If a screen has (or will have) a Claude Design wireframe, make sure
  the issue that first renders that screen also owns applying its
  visual design — fold styling into that issue, or create a separate,
  explicitly-scoped styling issue right alongside it. Don't leave
  "match the design" implicit across several functional issues; it
  won't happen on its own.

## 2. Design
- Build the prototype in Claude Design (claude.ai/design) — describe the
  flow, iterate on the canvas, generate edge states (empty/loading/error)
  before moving on.
- When it's ready, hand it off from Claude Design's side: Export →
  Handoff to Claude Code → "Send to local coding agent." This drops a
  bundle (HTML/CSS/JS + screenshots + README) that the local Claude Code
  CLI opens directly.
- Open Claude Code in this repo and point it at the bundle Claude Design
  handed off; it reads the README for stack/conventions and continues
  from there instead of starting over.
- If the handoff is pulled via Claude Design's MCP tools instead of a
  downloaded zip, note that binary assets (screenshots) can't be read
  that way — only text/READMEs transfer. Reference the live Claude
  Design project link for the actual visual; don't expect a local
  screenshot file.

## 3. Build (TDD)
For each GitHub issue, in its own branch:
- `git checkout -b issue-<number>-<short-slug>` (or use the "Create a
  branch" link on the issue itself, which names it for you).
- Write a failing test first.
- Implement the minimum code to make it pass.
- Refactor without changing behavior.
- Commit with a message referencing the issue number (e.g. `#12`).
- Never commit or push without the user's explicit go-ahead for that
  specific commit/push — even mid-issue, even for a small fix, even
  if the overall task was already approved. Ask each time.

## 4. Review & Test
- Push the branch: `git push -u origin <branch-name>`
- Open the PR: `gh pr create --title "..." --body "Fixes #12"` — the
  "Fixes #N" / "Closes #N" syntax is what triggers GitHub's auto-close
  on merge, and moves the Project card to Done if the board is set to
  auto-track issue status.
- **This is also what links the branch to the issue.** The "Fixes #N"/
  "Closes #N" text in the PR body is what makes the PR (and its branch)
  show up under the issue's "Development" section — that link appears
  once the PR exists, not before. There's no separate linking step to
  run.
  - `gh issue develop <number> --name <branch-name> --checkout` *creates
    a brand-new branch* pre-linked to an issue — useful at the start of
    step 3 instead of a plain `git checkout -b`. It only works before
    the branch exists remotely.
  - It does **not** retroactively link a branch you already created and
    pushed — running it against an existing branch name fails ("API
    returned empty branch name"). If you forgot to use it up front,
    don't bother going back for it: just open the PR with a closing
    keyword per above and the link appears automatically.
- Confirm `.github/workflows/ci.yml` (lint + test) is green before
  merging.

## 5. Deploy
- Vercel is connected to this repo. Every PR gets an automatic preview
  URL; merging to your default branch promotes to production. No
  manual deploy step needed. (One-off preview outside a PR:
  `vercel deploy`.)

## 6. Learn
- After a merge, check Vercel Analytics + deployment logs for real
  usage signals (errors, drop-off points).
- Turn findings into new GitHub issues (`gh issue create`, add to the
  project board). Restart at step 1 or step 3.

## One-time setup (do this once per new project made from this template)
1. Create the GitHub repo, push this scaffold as the first commit.
2. Create the project board: `gh project create --owner <owner> --title
   "<project name>"` (or via the GitHub UI, repo → Projects → New
   project).
3. Make sure your `gh` auth token has the `project` scope: `gh auth
   refresh -s project`.
4. Vercel → Add New Project → import this repo.
5. Vercel → Project Settings → Git → **Production Branch**: confirm it
   matches your repo's actual default branch (check with
   `git branch --show-current` right after your first push). Vercel's
   auto-detection can default to `main` even when your repo uses a
   different default branch, and there's no API/CLI way to fix this
   after the fact — dashboard only.
6. Vercel → Project Settings → **Deployment Protection**: decide
   whether preview/production URLs need to be viewable without a
   Vercel login. It's on by default, and blocked visitors get a
   misleading 404 rather than a 401/403. Turn it off (or scope it to
   production only) if you want public previews.
7. Once real app code is pushed (after Step 3's first build), double
   check Vercel → Project Settings → **Framework Preset**. Since this
   project got connected before any code existed, it may still say
   "Other" — set it explicitly (e.g. "Next.js") if so.
8. Vercel → Project Settings → Analytics → enable.
9. Pin the Node version this project needs (matching `.nvmrc` /
   `ci.yml`) — `nvm use` then picks it up automatically instead of
   falling back to whatever Node happens to be default on the machine.
10. If you'll drive Vercel locally via its CLI (`vercel dev`,
    `vercel promote`, inspecting settings): `vercel login`, then
    `vercel link --yes --scope <team-slug> --project <exact-project-name>`
    — always pass the exact project name explicitly. Non-interactive
    `--yes` linking without it will silently **create a duplicate
    project** instead of linking if the local folder name doesn't
    match exactly (e.g. a typo'd folder name).

No separate Claude Design setup needed — the handoff happens per-project
from the Export button in Claude Design, sent to your local Claude Code.

Once these are done, everything above runs without any extra wiring.
