# Claude Code -> Cursor Cheat Sheet

Here is the practical mapping for day-to-day use.

- `/edit` -> switch to Agent/Edit mode and ask directly: "Update `src/...` to ..."
- `/fix` -> "Fix this error" + attach stack trace/file; Cursor can inspect and patch in Agent mode
- `/test` -> ask Cursor to run/read tests and explain failures (Agent mode for running, Ask mode for guidance)
- `/review` -> ask "Review this diff for bugs/regressions" (Cursor will do code-review style feedback)
- `/explain` -> Ask mode: "Explain this file/function" with `@file` or selected code
- `/search` -> use chat with `@folder` + query, or global search + ask follow-up in chat
- `/plan` -> Ask: "Give me a step-by-step plan before coding"
- `/commit` -> ask explicitly: "Create a commit with message ..." (only in Agent mode)
- `/pr` -> ask: "Create a PR summary/title/body from current branch changes"
- `/run <cmd>` -> ask Agent to run the command and summarize output

## Cursor-native "command-like" habits

- `@` mentions: `@src/app` `@package.json` `@MyComponent.tsx`
- Selection-first prompting: highlight code, then ask "refactor/explain/fix this"
- Mode switching:
  - Ask = analysis/explanations only
  - Agent = can execute and edit
- Command Palette (`Ctrl+Shift+P`) for editor + AI actions
- Rules/Skills/Hooks for reusable team workflows (closest to custom slash-command behavior)

## Quick prompt templates (copy/paste)

- "Review `@src` for auth/security risks only."
- "Refactor selected code for readability without behavior changes."
- "Find why this error happens and propose minimal fix: `<error>`."
- "Generate a commit message from current staged diff."
- "Draft PR title + body from branch changes against `main`."

If you want, I can tailor this into a one-page cheat sheet for your exact stack (Next.js + Prisma + Tailwind v4) with prompts you will reuse daily.

## More command-like habits worth using

- `@` symbols are not only for files: use folders and relevant symbols to tightly scope context.
- Diff-scoped prompts: "Review only my current diff for regressions."
- Constraint-first prompts: "minimal change", "no refactor", "keep API unchanged", "strict TS, no `any`."
- Two-step workflow: Ask mode for plan/review, Agent mode for execution.
- Error-first debugging: include exact stack trace + failing command + expected behavior.
- Verification prompts: "run build/lint/tests and summarize failures only."

## High-value prompt patterns

- "Find all places where `X` is mutated and list risk points."
- "Propose 2 implementation options with trade-offs, then recommend one."
- "Refactor this function for readability without changing behavior."
- "Generate a PR description from commits on this branch."
- "Review for security/performance only; ignore style nits."

## IDE workflow commands worth using

- Command Palette (`Ctrl+Shift+P`) for AI and editor actions.
- Inline edit on selection for surgical refactors.
- Quick Fix / Code Actions for lint and type issue cleanup.
- Rename Symbol / Go to References before larger edits.
- Terminal + AI loop: run command, paste error, ask for the smallest valid fix.
