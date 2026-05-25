# CONTEXT

Project-specific domain vocabulary. Skills like `improve-codebase-architecture`, `diagnose`, and `tdd` read this when they need to talk about the codebase in the language the project actually uses.

This file is **lean by design** — add terms only when they're load-bearing for code or future conversations. The repo's positioning, content strategy, and tech-stack rationale live in user-local memory at `~/.claude/projects/E--------vitepress/memory/`, not here.

## Project

A VitePress static site being refactored into the public surface of a knowledge-based one-person business. Content is organized into five **Pillars**; the site captures subscribers via an email funnel, and surfaces digital products and 1-on-1 services on dedicated business pages. See `PRD.md` for active work, `DEVELOPMENT-GUIDE.md` for VitePress mechanics.

## Glossary

### Pillar

One of the five content categories that organize all blog posts: `self`, `system`, `practice`, `library`, `journal`. Each Pillar has a one-to-one mapping with a URL prefix under `docs/`. Pillars are the primary unit for navigation, sidebar grouping, and DocTail registration.

### DocTail

The registry-based mechanism that injects components at the end of article content. Lives at `docs/.vitepress/theme/doctail/`. Callers register a URL prefix (or eventually a frontmatter rule) plus a component to inject; the registry is consulted by a `doc-after` slot consumer that VitePress renders below the article body.

Use DocTail instead of hardcoded `if/else` in the theme. Phase 2 registers `NewsletterInlineForm` for `/self/`, `/system/`, `/practice/`; Phase 4 will register `RelatedProducts` for `/courses/`.

Individual pages can opt out via frontmatter `subscribe: false`.

### NewsletterAdapter

The ESP-agnostic interface for newsletter subscription. Lives at `docs/.vitepress/theme/adapters/newsletter/`. Exposes a single function `subscribe({ email, metadata }): Promise<SubscribeResult>`. Concrete implementations (currently only `beehiiv.ts`) handle the ESP-specific POST and response parsing.

Swapping ESP means writing a new adapter and changing one barrel re-export — no caller, layout, or markdown touches.

### SubscribeResult

The discriminated union returned by `NewsletterAdapter.subscribe`. Either `{ ok: true; alreadySubscribed?: boolean }` or `{ ok: false; reason: 'invalid-email' | 'rate-limited' | 'network' | 'unknown'; message?: string }`. Callers exhaustively switch on `ok` and `reason`; the adapter normalizes ESP-specific error codes into this shape.

### NewsletterInlineForm

The Vue component that renders the subscription form. Lives at `docs/.vitepress/theme/components/NewsletterInlineForm.vue`. Takes a `variant` prop (`inline` / `footer` / `landing` — `hero` deferred) and a `source` prop (string identifier passed as Beehiiv metadata for signup-source segmentation). Each variant exposes a default slot so callers can override the headline copy.

Imports `subscribe` from the `NewsletterAdapter` barrel; never references Beehiiv directly.

## Words to avoid

When talking about this codebase, do not drift into these synonyms — they suggest concepts the project doesn't use:

- "Newsletter service" / "subscription service" → use **NewsletterAdapter**.
- "Footer hook" / "article footer plugin" / "after-content slot" → use **DocTail**.
- "Category" / "topic" / "section" for content folders → use **Pillar**.
- "ESP wrapper" / "Beehiiv client" → use **NewsletterAdapter** (the implementation is `BeehiivAdapter` but the seam is `NewsletterAdapter`).
