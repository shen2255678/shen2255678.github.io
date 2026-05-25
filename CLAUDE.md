# CLAUDE.md

Project-specific instructions for Claude Code working on this repo.

## Project

A VitePress static site being refactored from a generalist tech blog into the public-facing surface of a **knowledge-based one-person business** positioned as "用 AI 打造一個比你更懂你的第二大腦／個人作業系統". Content sits in five **Pillars** (`self / system / practice / library / journal`) plus two business folders (`courses / services`). See `.scratch/knowledge-business-platform/PRD.md` for the active work breakdown, `CONTEXT.md` for domain vocabulary, and `DEVELOPMENT-GUIDE.md` for VitePress-specific guidance.

Project-private context (positioning, content architecture, writer-style scope, tech stack rationale) lives outside this repo at `~/.claude/projects/E--------vitepress/memory/`. Read its `MEMORY.md` index before any non-trivial task.

## Agent skills

### Issue tracker

Local markdown — issues and PRDs live under `.scratch/<feature-slug>/` in this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

Default canonical vocabulary (no overrides). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
