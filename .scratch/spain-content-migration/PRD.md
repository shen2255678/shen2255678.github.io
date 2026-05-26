# PRD — Spain Travel Content Migration (P0)

**Status**: Draft, not yet implemented.
**Scope**: Move 2 Spain travel articles + their 13 photos from `nextjs-blog-template` into the current VitePress site's `practice/` pillar. Frontmatter adapted to this site's conventions.
**Related**: Parent plan `C:\Users\haowei\.claude\plans\lemon-squeezy-cal-com-pagefind-next-js-b-recursive-mist.md` P0 item. CLAUDE.md identifies `practice/` as the pillar for "doing things in the real world" — travel content fits.

---

## Problem Statement

The current site has 11 articles total and `practice/` is sparsely populated. The author already has two completed Spain travel articles sitting in a separate Next.js template project (`E:\下班自學用\nextjs-blog-template\src\content\blog\`) with their own photographs (13 real `.jpg` files). These are finished, voice-already-set content that would otherwise be wasted.

Bringing them into the current site achieves three things simultaneously:
1. **Doubles practice/ pillar size** without writing new content.
2. **Validates the photo workflow** for the VitePress site (we don't yet know if `practice/` articles handle a 5+ photo article gracefully — these two are good stress tests).
3. **Establishes the travel-as-practice precedent** — these articles should not be treated as standalone travel logs; per project memory, `practice/` is "system reveal through real-world action". A short reframing intro paragraph at top of each article connects the trip to what the system revealed.

## Solution

Copy both Markdown files + all 13 photos into the VitePress repo. Adapt frontmatter to this site's conventions (drop `category` / Next.js-template-specific fields, keep `tags` / `summary` / `date`). Add a 2-paragraph "系統視角" reframing intro to each — not a rewrite, just a top-of-article reflection that connects the trip to the broader "用系統理解自己" thesis.

Photos go under `docs/public/images/trips/spain/` so the existing relative paths `/images/trips/spain/...` in the markdown keep working with zero find-replace.

## User Stories

1. As a reader landing on the practice pillar, I want to see substantive long-form content (not stub articles), so that I believe the pillar is worth subscribing for.
2. As a reader of a Spain travel article, I want a top-of-article paragraph that tells me why this travel log lives on a system-thinking site, so that I don't feel I clicked into the wrong blog.
3. As a reader, I want photos to load fast and crisp, so that the article feels production-quality.
4. As the owner, I want photo file paths to keep working without rewriting markdown image syntax, so that the migration is mechanical not surgical.

## Implementation Decisions

### Files to migrate

**Markdown** (source → destination):
- `nextjs-blog-template/src/content/blog/spain-adventure-10days.md` → `docs/practice/spain-adventure-10days.md`
- `nextjs-blog-template/src/content/blog/andalusia-spain-journey.md` → `docs/practice/andalusia-spain-journey.md`

**Photos** (`nextjs-blog-template/public/images/trips/spain/*.jpg` → `docs/public/images/trips/spain/`):
- `flamenco-show.jpg`
- `granada-albaicin.jpg`
- `granada-alhambra.jpg`, `granada-alhambra-1.jpg`, `granada-alhambra-2.jpg`, `granada-alhambra-3.jpg`
- `ronda-bridge-1.jpg`, `ronda-bridge-2.jpg`, `ronda-old-town.jpg`
- `sevilla-cathedral-1.jpg`, `sevilla-cathedral-2.jpg`
- `spanish-food-paella.jpg`
- `sunset-view.jpg`

### Frontmatter adaptation

Source frontmatter has Next.js-template-specific fields (`category`, `featured`, `coverImage`, `keywords`). Adapt to this site's conventions (verify against existing `docs/practice/*.md` files; if other practice articles use `category` already, keep it):

**Keep**: `title`, `date`, `updated`, `summary`, `tags`
**Drop**: `category: "歐洲旅行紀錄"` (the folder placement IS the category for this site's pillar structure) — but reconsider if other `practice/` articles use a `category` field for sub-grouping
**Drop**: `keywords` field is a Next.js-template-only SEO convention; VitePress doesn't read it. (Real SEO keywords come from on-page content + structured data, which is P1b's job.)
**Translate**: `coverImage: "/images/trips/spain/granada-alhambra-1.jpg"` → keep if any layout reads it; otherwise drop and the in-body images carry the visual weight
**Add**: `subscribe: true` (or whatever flag the theme's auto-newsletter-insertion logic requires, per `knowledge-business-platform/PRD.md:112`)

### 系統視角 reframing intro

Each article gets a new top section, ~2 short paragraphs, **written via the `writer-style` skill** (per project memory `feedback_writer_style_scope.md` — practice/ articles' personal-observation sections require it). Template intent (not literal text):

> 為什麼一篇旅遊文會出現在「practice」？
>
> 因為旅行從來不是換場景的休假，是個人作業系統在不同壓力環境下的壓力測試。
> 西班牙這 10 天 / 安達魯西亞這幾個城市，給我看到的不是景點，是我自己在「資訊過載 → 選擇 → 後悔 → 修正」這條迴路上的真實樣貌。下面這些紀錄，照原樣保留；但你讀的時候，看的不是我，是你自己會怎麼跑這套系統。

Each article's version is unique to that article's content. Author writes it (not Claude) or writer-style skill produces it.

### Image path strategy

VitePress serves files under `docs/public/` from the site root. The existing markdown uses `/images/trips/spain/granada-alhambra-1.jpg` which maps to `docs/public/images/trips/spain/granada-alhambra-1.jpg` after migration. **No find-replace needed in the markdown body.**

### Image optimization (deferred)

The 13 photos are full-resolution JPEGs from the Next.js template. They're functional but not optimized.
- **Now**: copy as-is. Migration ships.
- **Later**: when Cloudflare Pages migration (P1a) lands, enable Cloudflare Images / Polish on the JPEGs at the edge — zero-source-change perf win.
- **Don't**: pre-process to WebP locally. Keeps the source files clean; CDN handles format negotiation.

## Testing Decisions

- **Build smoke**: `pnpm docs:build` succeeds — VitePress doesn't choke on the new files.
- **Visual smoke** (local `pnpm docs:dev`): open each migrated article, confirm all 13 photos render (5-8 per article).
- **Sidebar check**: confirm the two new articles appear in `practice/` sidebar (auto-generated or `config.mts`-driven).
- **Newsletter form**: confirm Beehiiv form auto-inserts at the end of both (auto-insertion logic per parent PRD `knowledge-business-platform/PRD.md:112`).
- **Internal links**: if either article links to other articles in the original Next.js template (e.g., "see my Taroko post"), audit and either remove the link or convert it to a placeholder.

## Out of Scope

- **Migrating Taroko / hello-world / intro articles**. Taroko is travel-genre but the owner chose Spain only. The two `intro`/`hello-world` are template placeholders, not real content.
- **Rewriting article voice**. The articles ship as-written. Only the new top-of-article reframing intro goes through writer-style.
- **SEO meta-tagging**. That's P1b's job. Today, the existing frontmatter `summary` + `title` are enough for basic OG tags via the theme defaults.
- **Photo CDN / optimization**. Deferred to post-P1a (Cloudflare Pages enables edge image optimization for free).
- **Lightbox / gallery component**. Plain markdown `![]()` for now. If either article's reading experience suffers from inline-only images, file a separate component PRD (parent PRD line 205 already discusses PhotoGallery as a deferred component).
- **Translating to English**. Site is Chinese-only per parent PRD line 191.

## Risks & Rollback

**Risks**:
- Photo paths break (typo in `docs/public/` directory structure) → caught by visual smoke test.
- Frontmatter field this site requires gets dropped → caught by build smoke test or sidebar check.
- Article voice clashes with the rest of `practice/` content (these are travel-log voice; existing practice/ articles may be in a different register) → mitigated by the system-視角 reframing intro.

**Rollback**: revert the migration commit. Files are additive; no existing content is touched.

## Further Notes

**Why "P0 = content" includes a migration, not just writing**: the user has finished content sitting unused. Migrating it produces the same outcome (filled pillar) with 10% of the effort of writing fresh articles. Don't write what you can move.

**This should ship before P1a (Cloudflare Pages migration)**: more content makes the Cloudflare migration's smoke-test set bigger and more meaningful. Two more articles + 13 photos exercise the build pipeline harder than the current sparse content does.

**The reframing intro is the only writing work**. Everything else is filesystem copy + frontmatter trim. Time estimate: 1 hour migration mechanics + however long the writer-style reframing intros take.
