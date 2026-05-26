# PRD — Migrate Deploy from GitHub Pages to Cloudflare Pages (P1a)

**Status**: Draft, not yet implemented.
**Scope**: Hosting / deploy target only. Does NOT include SEO/GEO content layer (sitemap, JSON-LD, robots.txt, llms.txt) — that work is tracked separately as P1b and should follow this PRD's completion.
**Supersedes**: The "Cloudflare Pages migration" item in `knowledge-business-platform/PRD.md:195` "Out of Scope" list. That decision was made when GH Pages was sufficient; SEO/GEO requirements now make it insufficient.

**Related**:
- Parent plan: `C:\Users\haowei\.claude\plans\lemon-squeezy-cal-com-pagefind-next-js-b-recursive-mist.md` (decision: stay on VitePress, move off GH Pages)
- Current deploy: `.github/workflows/deploy.yml` (push to main → build → publish to `gh-pages`)
- Existing PRD: `.scratch/knowledge-business-platform/PRD.md`

---

## Problem Statement

The site currently deploys to GitHub Pages. This worked while the site was a personal blog, but as the project pivots toward a knowledge-based one-person business with SEO and GEO (Generative Engine Optimization — making content discoverable to LLM-powered search like ChatGPT / Perplexity / Google AI Overview) as priorities, GitHub Pages becomes a bottleneck:

1. **No custom HTTP headers**. Can't set `Cache-Control` strategy, security headers (`Strict-Transport-Security`, `X-Content-Type-Options`, `Permissions-Policy`, `Referrer-Policy`), or LLM-bot-specific responses. SEO/GEO tooling assumes header control.
2. **No edge / regional CDN**. Single origin, slow TTFB in APAC (the primary audience for a Traditional-Chinese-language site).
3. **No redirect engine**. Can't do server-side `301`/`302` for URL changes; rename or restructure means client-side hash hacks or broken inbound links from articles already shared.
4. **No edge functions**. Future-proofing: things like dynamic OG image generation, A/B tests, geo-based redirects, edge auth (if membership ever happens) are all impossible.
5. **Bandwidth + soft limits**. GH Pages publishes are a soft 1GB / 100GB-month limit with no observability. A traffic spike from an LLM citation or viral post has no graceful overflow.
6. **Build minutes consumed in GH Actions**. Build happens in Actions (counted against the user's free minutes); Cloudflare Pages builds free and includes preview deploys per PR.

Without proper hosting, the SEO/GEO work in P1b (`robots.txt` allow-list for LLM bots, `llms.txt`, JSON-LD injection, sitemap) sits on top of an infrastructure that can't fully serve it. P1a must land first.

## Solution

Migrate deploy from GitHub Pages to **Cloudflare Pages**, keeping VitePress as the framework and the existing repo structure untouched. Cloudflare Pages connects directly to the GitHub repo and runs the build on every push.

Visitor-side experience after migration: identical UX, faster TTFB (APAC edge nodes), proper HTTPS via Cloudflare Universal SSL, custom domain. Old GH Pages URLs continue to work via `_redirects`.

Owner-side experience after migration: push to `main` → Cloudflare Pages auto-builds → live in ~60 seconds. Per-PR preview URLs come for free. The current GH Actions workflow becomes a CI sanity check (lint + build), not a deploy step.

## User Stories

### Performance & Reach
1. As an APAC visitor, I want the site to TTFB in <200ms, so that pages feel instant and don't lose me before the content loads.
2. As an LLM crawler (GPTBot / ClaudeBot / PerplexityBot), I want stable response headers and predictable caching, so that I can index this site reliably for generative search results.
3. As the owner, I want preview URLs for every PR / branch push, so that I can review changes in the real production environment before merging.

### Security & SEO
4. As a security-conscious visitor, I want the site to send modern security headers (HSTS, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy), so that the site doesn't show up as "insecure" in audit tools.
5. As an SEO tooling user (Search Console / Ahrefs), I want canonical headers, proper `Cache-Control`, and serverside `301` redirects to work, so that my reports aren't polluted by client-side hash hacks or duplicate URLs.

### Continuity
6. As anyone who has shared an old `shen2255678.github.io` URL, I want those links to redirect to the new domain, so that historical inbound links keep working.
7. As the owner, I want existing integrations (Beehiiv submit, Giscus comments, all internal links) to keep working unchanged after the migration, so that no functionality regresses.

### Ops
8. As the owner, I want my GitHub Actions minutes to be conserved, so that I don't hit free-tier limits from build-on-every-push.
9. As the owner, I want a one-place rollback story, so that if a deploy breaks the site, I can revert in <5 minutes.

## Implementation Decisions

### Why Cloudflare Pages (not Vercel, Netlify, GH Pages, self-hosted)

- **Cloudflare Pages**: ✅ Free tier generous (unlimited bandwidth, 500 builds/month), APAC edge presence is best in class, native Workers integration for future edge logic, `_headers` / `_redirects` are flat-file declarative. **Chosen.**
- **Vercel**: Strong for Next.js, weaker for non-Next static sites; bandwidth quota tighter; APAC edge weaker than Cloudflare; no advantage when framework is VitePress.
- **Netlify**: Comparable feature set but smaller free tier and weaker APAC presence.
- **Stay on GH Pages**: Rejected — driving requirement (header / redirect / edge control for SEO/GEO) cannot be met.
- **Self-hosted (VPS + Nginx)**: Rejected — adds ops burden that a one-person business should not carry; SSL renewal, security patching, log rotation are time sinks.

### What ships in this PRD

1. **Cloudflare Pages project**, connected to this GitHub repo.
   - Framework preset: `VitePress`
   - Build command: `pnpm install --frozen-lockfile && pnpm docs:build` (or current build script — verify against `package.json`)
   - Build output: `docs/.vitepress/dist`
   - Node version pin: matches local (read from `.nvmrc` if present, else 20 LTS)
   - Branch deploy: `main` → production; all other branches → preview URLs

2. **Environment variables** ported from GH Actions to Cloudflare Pages dashboard:
   - `VITE_BEEHIIV_PUBLICATION_ID` (currently in `.github/workflows/deploy.yml:44`)
   - Any other secrets discovered in audit of the workflow file

3. **`docs/public/_headers`** — declarative headers file (Cloudflare Pages picks up files in the build output's `public/`-equivalent root):
   ```
   /*
     Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
     X-Content-Type-Options: nosniff
     Referrer-Policy: strict-origin-when-cross-origin
     Permissions-Policy: camera=(), microphone=(), geolocation=()
     X-Frame-Options: DENY

   /assets/*
     Cache-Control: public, max-age=31536000, immutable

   /*.html
     Cache-Control: public, max-age=0, must-revalidate
   ```
   Note: CSP header intentionally deferred — it requires inventorying every external embed (Beehiiv, Giscus, Cal.com, Lemon Squeezy when added) and getting it wrong breaks the site. Add CSP in a follow-up PRD once the embed list is stable.

4. **`docs/public/_redirects`** — handles continuity from old paths:
   ```
   # Example — actual rules added based on URL audit
   /old-path-from-legacy-site /new-path 301
   ```
   The exact redirect list will be generated from a quick audit of `git log` for renamed routes + a manual check of any externally-shared old URLs (newsletter signatures, social bios). If no old URLs need redirecting (the refactor already broke them), this file can be empty but present for future use.

5. **Custom domain** wired to Cloudflare Pages with Universal SSL.
   - Current domain decision: TBD (placeholder for owner to fill in; the parent plan mentions this is unresolved). Until decided, use the auto-assigned `<project>.pages.dev` URL.

6. **`.github/workflows/deploy.yml`** → rewrite as **`.github/workflows/ci.yml`**:
   - Trigger: PRs against main + pushes to main
   - Jobs: lint check + `pnpm docs:build` (build-must-pass gate)
   - No publish step — Cloudflare Pages owns deploy
   - Beehiiv env var still passed during build because the build needs it baked in

7. **Repo README / `CLAUDE.md` / `DEVELOPMENT-GUIDE.md`**: update any reference to `gh-pages` deploy or `shen2255678.github.io` so docs reflect the new reality.

### Architectural Decisions

- **Keep `output: dist` static build**. No SSR, no edge rendering. VitePress's static output ships as-is to Cloudflare's edge.
- **`_headers` and `_redirects` live in `docs/public/`** because VitePress copies that folder verbatim into `dist/` at build time. This keeps deploy config version-controlled with the content, not split between repo and Cloudflare dashboard.
- **GitHub Actions stays for CI only**. Build still runs in Actions on every PR to catch breakage before Cloudflare even tries to deploy. Cloudflare's own build is the production build.
- **No CDN cache busting required**. VitePress emits hashed asset filenames; the `Cache-Control: immutable` on `/assets/*` is safe.
- **DNS strategy**: if the chosen domain is registered at Cloudflare Registrar, use one-click attach. If elsewhere, set `CNAME` to the Pages URL. Defer registrar consolidation to a separate decision.

### Migration Sequencing (safe order)

1. Create Cloudflare Pages project pointing at the repo on a **non-production** branch first (e.g., `chore/cloudflare-pages-migration`) — verify build works.
2. Add `_headers` + `_redirects` files on that branch — verify the preview URL serves them correctly.
3. Smoke test on preview URL: load homepage, load one article per pillar, submit Beehiiv form (real submission to a test email), open Giscus on an article, check 5+ internal links.
4. Merge branch to main → Cloudflare Pages auto-promotes the preview to production at `<project>.pages.dev`.
5. (Optional, can defer) Attach custom domain in Cloudflare dashboard, set DNS, wait for SSL provisioning (~5 min).
6. Update `.github/workflows/deploy.yml` → CI-only `ci.yml`; keep Beehiiv env var for build, remove publish step.
7. **Do NOT delete** the `gh-pages` branch yet — keep as fallback for 30 days. Then garbage-collect.
8. Update README / CLAUDE.md docs to reflect Cloudflare Pages as the deploy target.

## Testing Decisions

**Pre-cutover** (on Cloudflare preview URL, before pointing custom domain):
- Build smoke: `pnpm docs:build` runs clean in Cloudflare's build environment (same Node version as local).
- Visual smoke: homepage + one article from each of the 5 pillars renders identical to current GH Pages.
- Beehiiv form: real submit with a test address, confirm email arrives.
- Giscus: open one article, confirm comment widget loads (auth flow not needed for read).
- Internal links: spot-check 10 internal links across pillars — no 404s.
- Headers verification: `curl -I` against preview URL → confirms `_headers` rules are being applied. Use [securityheaders.com](https://securityheaders.com) for an external grading sanity check.
- Lighthouse: run on preview URL, compare against current GH Pages numbers. Performance should be equal-or-better; SEO/Best-Practices should improve from header additions.

**Post-cutover** (after custom domain switch, if doing it):
- DNS propagation check.
- SSL certificate valid (Cloudflare Universal SSL).
- One real subscriber submits via the form to confirm prod Beehiiv pipeline.

**Out of scope for testing**:
- Load testing — irrelevant at current traffic.
- Cross-browser matrix — VitePress + Vue 3 already handles this; not a deploy concern.
- Pagefind search — not yet installed (that's P2).
- LLM crawler verification — covered by P1b's `robots.txt` + `llms.txt` work; this PRD only ensures the headers infrastructure exists for them.

## Out of Scope

Explicitly NOT in this PRD (to keep it focused on the deploy target swap):

- **CSP header** — needs separate embed audit; ship after embed list (Cal.com, Lemon Squeezy) is finalized.
- **`robots.txt` / `llms.txt` / `sitemap.xml` / JSON-LD** — all P1b work; depends on this PRD shipping first.
- **Pagefind search** — P2.
- **Beehiiv replacement** — keep current Beehiiv setup; only change is env var moves from GH Actions to Cloudflare dashboard.
- **Repo divergence cleanup** — the 158-commit `origin/main` issue (per parent PRD line 218) is a separate ops decision.
- **Self-hosted analytics** — Phase 5 in parent PRD.

## Risks & Rollback

**Risks**:
- Cloudflare build fails for VitePress-specific reason → mitigated by testing on a branch's preview URL before merging.
- Custom domain DNS misconfigured → mitigated by keeping GH Pages live until Cloudflare custom domain is verified working.
- `_headers` syntax error breaks header delivery → mitigated by `curl -I` verification post-deploy.
- Beehiiv env var not set in Cloudflare dashboard → form silently fails. Mitigated by smoke-test step #3 above.

**Rollback** (if needed within 30 days):
1. Re-point DNS back to GH Pages.
2. Re-enable GH Actions deploy workflow (don't delete it during this migration — comment it out or rename it `.disabled`).
3. GH Pages `gh-pages` branch still has the last working build.
Total rollback time: <10 minutes.

## Further Notes

**Why this happens before P1b (SEO/GEO content layer)**: P1b's value is conditional on hosting infrastructure that can deliver headers + redirects properly. Doing P1b on GH Pages would mean shipping `robots.txt` / `llms.txt` that work, but missing the structural improvements (`Cache-Control` for LLM bot caching, `Vary` headers, security headers) that turn the site into a first-class SEO/GEO citizen.

**Why this doesn't drive a Next.js migration**: deploy target is independent of framework. Both VitePress and Next.js can deploy to Cloudflare Pages. The earlier decision (parent plan section "Recommendation") to stay on VitePress holds — Cloudflare Pages migration is a hosting upgrade, not a framework change.

**Custom domain decision blocks final cutover**. The owner needs to finalize the domain before step 5 of the migration sequence. Until then, ship to `<project>.pages.dev`. If the domain isn't decided by the time the rest is done, the migration can complete on the Pages URL and the domain attached later as a one-off.

**Time estimate**: half day of focused work (~3-4 hours) for the technical migration, plus whatever decision time the owner needs for domain.
