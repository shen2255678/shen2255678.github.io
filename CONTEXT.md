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

### Post

A markdown file under one of the five **Pillars** that carries a `date` in its frontmatter. The data loader at `docs/.vitepress/data/posts.data.ts` scans all five Pillar folders and emits one `Post` per file that has a date. Files without a date (pillar index pages, the resource overview, the `library/tech-stack.md` reference doc) are intentionally excluded — they're pages, not posts.

A Post has exactly one **Pillar** (derived from URL prefix) and zero-or-more **Tags** (from `tags:` frontmatter array). Pillar = primary axis (one per post). Tag = secondary axis (many per post, may cross Pillars). The Archive page groups by date, Categories groups by Pillar, Tags groups by tag.

## Classification rules

The site has three orthogonal ways to slice content. Keep them distinct — drifting between them creates duplicated navigation that doesn't help readers.

- **Pillar (primary, mandatory)** — one of `self / system / practice / library / journal`. Determined by folder placement, not frontmatter. Every Post belongs to exactly one Pillar. This is the main navigation axis and the unit of DocTail injection.
- **Tag (secondary, optional, cross-cutting)** — free-form strings in frontmatter `tags: []`. A tag MAY appear under multiple Pillars (e.g. `AI` shows up in both `system/` and `practice/`). Tags exist to surface affinity that the folder structure doesn't capture. Keep the tag vocabulary small — under ~30 distinct tags total — or the Tags page becomes noise.
- **Archive (derived)** — chronological view by year + month, computed from `date:` frontmatter. No author action needed beyond writing the date.

Pages that surface each axis: `/categories` (Pillar), `/tags`, `/archive`. All three read from the same `posts.data.ts` source.

### SITE_URL

Single source of truth for the site's public origin. Defined in `docs/.vitepress/data/site.ts` alongside `SITE_AUTHOR`, `SITE_NAME`, `SITE_DESCRIPTION`, `SITE_DEFAULT_OG_IMAGE`, `AUTHOR_SOCIALS`.

Used by sitemap generation, canonical URLs, Open Graph tags, and every JSON-LD schema. A custom-domain swap is a one-constant change here — never hard-code the origin elsewhere.

### SeoHead

The per-page head-tag generator at `docs/.vitepress/data/seo-head.ts`. Exposes `buildHead(pageData: PageData): HeadConfig[]`, called from `config.mts` via VitePress's `transformHead` hook.

`buildHead` is a pure function: same input → same output, no side effects. It dispatches on the page's `relativePath` to emit the right combination of canonical, Open Graph, Twitter Card, `article:*` meta, and JSON-LD scripts.

### GEO

Generative Engine Optimization — discoverability for AI search/answer engines (ChatGPT browse, Perplexity, Claude search, Google AI Overview, Bing Copilot). Distinct from classic SEO because AI engines extract semantic structure, not keywords; they prefer JSON-LD over `<meta>` and follow `llms.txt` for site-level summaries.

This site's GEO surface = **JSON-LD `Article` / `Person` / `WebSite` / `BreadcrumbList`** injected by `SeoHead` + `public/llms.txt` + standard `public/robots.txt` + `sitemap.xml`. No dynamic OG image generation yet (Phase 4+).

## Words to avoid

When talking about this codebase, do not drift into these synonyms — they suggest concepts the project doesn't use:

- "Newsletter service" / "subscription service" → use **NewsletterAdapter**.
- "Footer hook" / "article footer plugin" / "after-content slot" → use **DocTail**.
- "Category" / "topic" / "section" for content folders → use **Pillar** (the `/categories` page exists, but the *concept* is Pillar).
- "ESP wrapper" / "Beehiiv client" → use **NewsletterAdapter** (the implementation is `BeehiivAdapter` but the seam is `NewsletterAdapter`).
- "Article" / "entry" for files under a Pillar → use **Post** (and remember: a markdown file without a `date:` is a *page*, not a Post).
- "SEO tags" / "meta tags" / "structured data injection" → use **SeoHead** (the function that emits them).
- "AI sitemap" / "ChatGPT discovery file" → use **llms.txt** (the actual file format name).
- "Search engine optimization for AI" → use **GEO**.
- Hard-coding `https://shen2255678.github.io` anywhere except `data/site.ts` → import **SITE_URL** instead.
