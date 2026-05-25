# PRD — Knowledge-Based One-Person Business Platform (Remaining Work)

**Status**: Phase 1 (folder reorg + config) shipped in commit `46b3a7b`. This PRD covers Phases 2–5 (custom layouts, lead-magnet funnel, commerce embeds, search, content production, ops setup).

**Related**:
- Full architectural plan: `C:\Users\haowei\.claude\plans\blog-https-travelwithmiya-com-innsbruck-mutable-gosling.md`
- Project memory: `C:\Users\haowei\.claude\projects\E--------vitepress\memory\`
- Repo: `shen2255678/vitepress` (local diverged from origin; sync decision deferred)

---

## Problem Statement

The site owner wants to turn an existing VitePress blog into the public-facing surface of a knowledge-based one-person business positioned as **"教你用 AI 打造一個比你更懂你的第二大腦／個人作業系統"**.

After Phase 1, the content is reorganized into 5 pillars (`self / system / practice / library / journal`) plus 2 business folders (`courses / services`), and the config aligns with the new positioning. But:

- The homepage still uses the default VitePress hero layout — it doesn't yet support the "content-first blog homepage" with multi-point newsletter capture that was approved.
- There is no email capture anywhere on the site, so visitors can't be converted into newsletter subscribers — the single most important conversion mechanic for the business.
- There's no `/subscribe` landing page, so external CTAs (IG, Threads, email signature) have nowhere clean to link to.
- No commerce surfaces exist: visitors who want to buy a digital product or book a 1-on-1 service have no path.
- Comments are still using placeholder Giscus credentials.
- Search is configured with a placeholder Algolia key (non-functional).
- The about page is short and doesn't yet do the brand work the positioning requires.
- The 5 content pillars are mostly empty — only `system/` and `practice/` have prior content, the core moat `self/` is empty.
- The third-party theme `vitepress-theme-open17` is on a caret-range version; an upstream update can break the customizations at any moment.

Until these gaps are closed, the site cannot fulfill its role in the trust-building funnel (stranger → subscriber → reader → buyer), and the owner's daily content production has no audience-capture loop.

## Solution

Ship Phases 2–5 as a sequence of self-contained increments, each of which leaves the site in a better state than before. Each phase is independently shippable.

The visitor-side experience after all phases:

1. Stranger lands on any article from SEO/social → reads.
2. Sees an inline newsletter form at the end of every pillar article → trades email for the 7-day mini-course.
3. Receives 7 emails over 7 days (Beehiiv automation), each ending with one named concept and a soft pointer to the next step.
4. On day 7, gets a CTA to either buy the first digital product (Notion template) or book a 1-on-1 service.
5. Throughout, can browse five clearly-themed pillars from a content-first homepage, comment via Giscus, find old posts via Pagefind, and trust the brand because the About page does the deep storytelling work.

The owner-side experience after all phases:

1. Writes new content as markdown under the right pillar folder. Theme auto-inserts the subscribe form at the end. No layout touching required.
2. Sells digital products by adding a new file under `docs/courses/[slug].md` with frontmatter referencing a Lemon Squeezy product ID.
3. Books 1-on-1 services via Cal.com embed on `/services`.
4. Never has to touch backend, auth, payments, or member systems.

## User Stories

### Conversion / Newsletter Funnel

1. As a first-time visitor, I want to see what this site is about within 5 seconds of landing on the homepage, so that I can decide whether to keep reading.
2. As a first-time visitor reading any pillar article, I want to be offered a free email mini-course at the end, so that I get something valuable for my email.
3. As a first-time visitor who wants to subscribe but doesn't want to finish the article, I want a footer subscription form on every page, so that I can subscribe from anywhere.
4. As a visitor sharing the newsletter externally (IG bio, Threads, email signature), I want a clean dedicated `/subscribe` landing page, so that I can link to it without the rest of the site competing for attention.
5. As a brand-conscious owner, I want **no popup or interstitial subscription prompts**, so that the visitor experience matches the brand's "respect, depth" positioning.
6. As a subscriber, I want to receive the first email of the mini-course immediately after subscribing, so that the value exchange feels instant.
7. As a subscriber, I want to receive 7 emails over 7 days, each ending with one named concept and a small action, so that I build a daily relationship with the brand.
8. As a subscriber finishing day 7 of the mini-course, I want to be offered a clear next step (the paid Notion template OR booking a 1-on-1 session), so that there's a path forward without feeling oversold.

### Content Reading / Discovery

9. As a returning reader, I want a content-first homepage (not a single-CTA landing page), so that I can browse what's new.
10. As any reader, I want to see "從這裡開始" featured posts on the homepage, so that I have a curated entry point if I'm new.
11. As any reader, I want five clearly-themed pillar cards on the homepage, so that I can pick the topic that interests me.
12. As any reader, I want to search across all articles, so that I can find old content I've read before.
13. As any reader, I want comments on every article, so that I can engage with the community and the author.
14. As any reader, I want the article reading experience to remain fast and uncluttered, so that I don't feel like I'm being sold to.

### About / Trust

15. As a first-time visitor curious about the author, I want a deep About page that explains who they are, what their system is, and what they believe, so that I can decide whether to trust them.
16. As a depth-seeking reader, I want the About page to reveal the deeper layer (印度占星 / 榮格 / 系統思維 frameworks) after the universal-language hook, so that the trojan-horse content strategy works.

### Commerce / Conversion to Revenue

17. As a high-intent reader, I want to find the author's digital products listed clearly, so that I can buy without searching.
18. As a buyer of a digital product, I want a one-click checkout via Lemon Squeezy, so that I don't deal with multiple forms.
19. As a high-intent reader, I want to find the author's 1-on-1 services with clear pricing and what's included, so that I can decide if it fits my need.
20. As a service buyer, I want to book and pay in one flow via Cal.com + Stripe, so that I don't bounce between systems.
21. As a buyer of any kind, I want to feel like the site respects me (no upsells, dark patterns, fake scarcity), so that I trust the brand for future purchases.

### Owner Daily Workflow

22. As the owner writing a new article, I want to drop a `.md` file under the right pillar folder and the newsletter form auto-appears at the end, so that I never have to touch layout per article.
23. As the owner publishing a new digital product, I want to add one `.md` file under `docs/courses/` with frontmatter pointing at a Lemon Squeezy product, so that the sales page generates itself.
24. As the owner updating my About page, I want the layout to handle deep storytelling (long sections, image asides, pull-quotes), so that I can focus on writing not formatting.
25. As the owner deciding to add a new pillar in the future, I want the nav + sidebar structure to be data-driven (one place to update), so that I don't break links.
26. As the owner upgrading dependencies, I want the open17 theme version locked, so that an unintended upgrade can't break my custom layouts overnight.

### Ops / Infrastructure

27. As the owner, I want Giscus comments fully wired (real `repoId` / `categoryId`), so that visitor comments actually work.
28. As the owner, I want a custom domain pointing at the site, so that the brand isn't `shen2255678.github.io`.
29. As the owner, I want a working Beehiiv publication with a 7-day automation set up, so that subscribers get the mini-course without manual intervention.
30. As the owner, I want the existing legacy `origin/main` (158 commits of `.html` clutter) handled — either force-pushed-over with the refactored branch, or archived to a `legacy` branch and `main` replaced — so that the public repo reflects the current state.

## Implementation Decisions

### Modules

**Custom Layout System** (deep)
- Five Vue components: `HomeLayout`, `AboutLayout`, `SubscribeLayout`, `ProductLayout`, `ServicesLayout`.
- Each opts in via frontmatter `layout: custom` plus a layout selector (or per-file Vue import).
- Each delegates header/footer to the open17 theme via slot extension where possible, so brand chrome stays consistent.
- Why deep: the interface is "pages declare which layout via frontmatter; layouts render their content using common components". The implementation of each layout is hidden behind the frontmatter contract.

**Newsletter Capture Module** (deep)
- One component, `NewsletterInlineForm`, that wraps Beehiiv embed HTML.
- Public interface: optional props for headline text + emphasis variant ("inline", "footer", "hero", "subscribe-page").
- Auto-insertion hook in `theme/index.js` `Layout` slot `doc-after` so any article in `/self/`, `/system/`, `/practice/` automatically gets the form at the end with no per-article markup.
- Why deep: the entire ESP-integration concern lives behind one component. If we ever swap Beehiiv for Kit, only this file changes.

**Content Pillar UI** (shallow utilities)
- `PillarCard.vue` — receives `{ title, description, icon, link }` props, renders one tile.
- `FeaturedPosts.vue` — receives a list of post slugs, renders them as cards.
- These are intentionally shallow — they're presentational, not architectural.

**Commerce Embed Module** (deep)
- `LemonSqueezyButton.vue` — receives a product ID, renders the official overlay button.
- `CalComEmbed.vue` — receives an event-type slug, renders the inline booking widget.
- Both are deep modules: integration logic lives behind a one-prop interface; layouts use them without knowing implementation.

**Search Module** (deep)
- Pagefind: build-time static index of all pillar content + npm script integration.
- Replaces the existing placeholder Algolia config in `themeConfig`.
- Why deep: the entire search behavior is hidden behind one nav-bar component; layouts and articles don't know search exists.

**Theme Version Lock** (tiny dep-mgmt task)
- Remove caret from `vitepress-theme-open17` in `package.json`, regenerate lock.
- One-line change.

### Architectural Decisions

- **Pages use `layout: custom`** rather than separate routes — keeps a uniform VitePress build pipeline; layouts are just Vue components selectable from a registry.
- **Newsletter auto-insertion via theme slot, not per-file markup** — ensures owner workflow stays "drop a markdown file, done". Articles can opt out by setting `subscribe: false` in frontmatter (escape hatch for landing pages, TOS, etc.).
- **Categorization via frontmatter `category` field** — not just folder placement. This enables future cross-pillar features (e.g., "all articles tagged with `self-knowledge`") without a folder rearrangement.
- **No analytics in Phase 2** — confirmed in grill, deferred to Phase 5 with Umami self-hosted.
- **No popup subscribe** — explicit anti-decision; brand consistency takes precedence over conversion-rate optimization.
- **`origin/main` legacy commits not merged** — local is canonical going forward; resolve via force-push or branch-rename when the refactor reaches a deployable state.

### API Contracts (Component Interfaces)

- `<NewsletterInlineForm variant="inline|footer|hero|subscribe-page" />` — variant controls density/styling, not data source.
- `<PillarCard :pillar="{ slug, title, description, icon }" />` — pure presentational.
- `<FeaturedPosts :slugs="['self/post-a', 'system/post-b']" />` — author curates by slug.
- `<LemonSqueezyButton :productId="..." :text="..." />` — opens overlay on click.
- `<CalComEmbed :eventSlug="..." />` — inline booking widget.

### Content Production Decisions

- **All "human voice" content** (`about.md`, `subscribe.md` copy, 7 mini-course emails, all pillar articles in `self/practice/journal/`) must be produced via the `writer-style` skill. Authority memory: `feedback_writer_style_scope.md`.
- **Existing `practice/*` posts** (the migrated travel articles) need a "system reveal" reframe block prepended to each — not a full rewrite, just a 2-paragraph reflection at the top connecting "my system led me here, this is what it revealed about me".
- **`docs/system/`** technical how-to content can be written directly without writer-style for steps; personal-observation sections still go through writer-style.

## Testing Decisions

This is a content-heavy static site with third-party embeds. Most "logic" is presentational. Tests should target external behavior, not Vue component internals.

**What makes a good test here:**
- Tests the user-visible outcome (page renders, link works, form submits) — not whether a Vue prop was passed.
- Uses real artifacts (real Beehiiv embed, real Lemon Squeezy overlay) in dev/staging — not mocks that can drift from production.
- Runs fast enough to be part of every CI run (build smoke test < 30s).

**Modules to test:**

1. **Build smoke test** (already in place implicitly — `npm run docs:build`). Add to CI: any new layout / component must keep build green. No dead links allowed.

2. **Newsletter Capture Module** — manual e2e in dev: subscribe with a test email, verify first mini-course email arrives in Beehiiv inbox. Repeat once per Beehiiv automation change. No automated test (Beehiiv would need API mocking that adds drift risk).

3. **Custom Layouts** — Playwright smoke: per layout, load the page, assert title + primary CTA exists. Prior art: `.playwright-mcp/` is already set up locally.

4. **Commerce Embed Module** — manual: Cal.com test booking with Stripe test mode confirms booking arrives; Lemon Squeezy test purchase confirms download is delivered. Run once per environment / API key change.

5. **Search** — manual: after build, search for known text returns the article. No automated test (Pagefind is a black-box library; testing it tests their code).

**Out of scope for testing:**
- Unit tests on PillarCard / FeaturedPosts — they're presentational; visual review is the verification.
- Snapshot tests on layout HTML output — they go stale fast and provide noisy failures on every styling tweak.
- E2E for the 7-email mini-course delivery — that's owned by Beehiiv; manual verification once per setup.

## Out of Scope

The following are **explicitly not part of this PRD** (per the approved plan's "不做" list):

- **Paid membership / member-only content** — too early; revisit only after newsletter clears ~500 subscribers and the first digital product has revenue.
- **Display advertising (AdSense / Mediavine / etc.)** — off-brand; permanently excluded.
- **Google Analytics** — privacy/brand mismatch; if analytics is added in Phase 5, it's self-hosted Umami.
- **Popup / interstitial subscribe forms** — brand consistency win > conversion rate gain.
- **Bilingual (zh + en) content** — Chinese only; revisit when at least 3 pillars have 10+ articles each.
- **Pre-recorded video courses** — revisit only after at least 10 completed 1-on-1 service engagements provide validated curriculum.
- **Notion → VitePress automated sync** — author flow is markdown-first; Notion stays as private second brain.
- **Membership SaaS integration (Outseta / Memberstack)** — architecturally compatible (JS overlay) but explicitly deferred; no work needed now.
- **Cloudflare Pages migration** — GitHub Pages stays unless a real bandwidth/perf reason emerges.
- **Custom theme replacing open17** — pragmatic decision to extend, not replace.

## Further Notes

**Phase ordering matters.** Phase 2 ships the conversion mechanism before Phase 3 ships content, because content without capture = wasted traffic. Phase 4 ships commerce only after the newsletter funnel is proven, because selling without trust = low conversion + brand damage.

**Deferred capabilities — rebuild fresh when actually needed.** Three legacy components were deleted in the architectural-cleanup pass (commits after Phase 1) because they were hardcoded one-shot widgets, not reusable abstractions. If the one-person business needs the underlying capability later, build the deepened version then; don't restore the legacy code (it's tightly coupled to specific images / dead use cases). Trigger conditions:

- **Photo carousel** (legacy: `Swiper.vue`, `Swiper1.vue`) — rebuild as `PhotoCarousel.vue` with `:images` + `:captions` props when a `practice/` post needs >3 photos that demand swipe interaction. For 1–3 photos, plain markdown `![](...)` is enough.
- **Photo gallery** (legacy: `photoWall.vue` aka `ImageSlider`) — rebuild as `PhotoGallery.vue` with `:items=[{src, title, description}]` when a `practice/` post needs a structured gallery with captions and lightbox. Current `photoWall.vue` still globally registered but unused; delete in a future cleanup once Phase 3 content makes the keep/replace decision concrete.
- **Booking / contact form** (legacy: `BookingForm.vue`) — most likely *never needed*. Cal.com handles 1-on-1 bookings; Lemon Squeezy handles purchases; `contact.md` handles inquiries via mailto. Only rebuild if a workflow appears that none of these three cover (e.g., custom enterprise inquiry form for `/services/enterprise`).

> Recovery: any legacy component can be retrieved with `git log --all --full-history -- '*<Name>.vue'` to find the last commit, then `git show <commit>:<path>` to view its source.



**Author-side actions that block Claude.** Phase 2 can ship without these, but they must land in parallel for the funnel to work end-to-end:
- Beehiiv account + publication + 7-day automation set up
- Giscus `repoId` / `categoryId` provisioned
- Brand name finalized (current placeholder: "Haowei")
- Custom domain decision

**The 158-commit divergence between local and `origin/main`.** Tracked as a separate ops decision under user story #30. Recommendation when refactor reaches deployable state: rename current local branch as `main-v2`, archive remote main as `legacy/pre-refactor`, then force-push. Do not perform this destructive op until the refactored site has been verified end-to-end.

**Memory & skill integration.** All persistent context for this project (positioning, content architecture, tech stack, writer-style scope) lives under `C:\Users\haowei\.claude\projects\E--------vitepress\memory\`. Any future Claude session should read `MEMORY.md` before starting work.
